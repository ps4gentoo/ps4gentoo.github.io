#include "ps4.h"
#include "defines.h"

#define    KERN_XFAST_SYSCALL 0x1c0

#define	CTL_KERN	1	/* "high kernel": proc, limits */
#define	KERN_PROC	14	/* struct: process entries */
#define	KERN_PROC_VMMAP	32	/* VM map entries for process */
#define	KERN_PROC_PID	1	/* by process id */

extern char kexec_data[];
extern unsigned kexec_size;

static int sock;

void usbthing();

unsigned int long long __readmsr(unsigned long __register) {
	// Loads the contents of a 64-bit model specific register (MSR) specified in
	// the ECX register into registers EDX:EAX. The EDX register is loaded with
	// the high-order 32 bits of the MSR and the EAX register is loaded with the
	// low-order 32 bits. If less than 64 bits are implemented in the MSR being
	// read, the values returned to EDX:EAX in unimplemented bit locations are
	// undefined.
	unsigned long __edx;
	unsigned long __eax;
	__asm__ ("rdmsr" : "=d"(__edx), "=a"(__eax) : "c"(__register));
	return (((unsigned int long long)__edx) << 32) | (unsigned int long long)__eax;
}

int kpayload(struct thread *td, struct kpayload_args* args){

	//Starting kpayload...
	struct ucred* cred;
	struct filedesc* fd;

	fd = td->td_proc->p_fd;
	cred = td->td_proc->p_ucred;

	//Reading kernel_base...
	void* kernel_base = &((uint8_t*)__readmsr(0xC0000082))[-KERN_XFAST_SYSCALL];
	uint8_t* kernel_ptr = (uint8_t*)kernel_base;
	void** got_prison0 =   (void**)&kernel_ptr[0x113E518];
	void** got_rootvnode = (void**)&kernel_ptr[0x2300320];

	//Resolve kernel functions...
	int (*copyout)(const void *kaddr, void *uaddr, size_t len) = (void *)(kernel_base + 0x3C16B0);
	int (*printfkernel)(const char *fmt, ...) = (void *)(kernel_base + 0x123280);
	int (*set_nclk_mem_spd)(int val) = (void *)(kernel_base + 0x19A390);
	int (*set_pstate)(int val) = (void *)(kernel_base + 0x4FC2E0);
	int (*set_gpu_freq)(int cu, unsigned int freq) = (void *)(kernel_base + 0x4E0530);
	int (*update_vddnp)(unsigned int cu) = (void *)(kernel_base + 0x4E0B10);
	int (*set_cu_power_gate)(unsigned int cu) = (void *)(kernel_base + 0x4E0F20);
	
	cred->cr_uid = 0;
	cred->cr_ruid = 0;
	cred->cr_rgid = 0;
	cred->cr_groups[0] = 0;

	cred->cr_prison = *got_prison0;
	fd->fd_rdir = fd->fd_jdir = *got_rootvnode;
	
	//CLK, CU, ..
	set_pstate(3);
	set_nclk_mem_spd(8);

    set_gpu_freq(0, 800); //800 //800
    set_gpu_freq(1, 853); //673 //853
    set_gpu_freq(2, 711); //610 //711
    set_gpu_freq(3, 800); //800 //800
    set_gpu_freq(4, 911); //800 //911
    set_gpu_freq(5, 800); //711 //800
    set_gpu_freq(6, 984); //711 //984 
    set_gpu_freq(7, 673); //673 //673
	
	update_vddnp(0x24);
	set_cu_power_gate(0x24);
	
	//Disable write protection...
	uint64_t cr0 = readCr0();
	writeCr0(cr0 & ~X86_CR0_WP);
	
	kernel_ptr[0x20734E] = 3; //6.72 pstate when shutdown

	//Kexec init
	void *DT_HASH_SEGMENT = (void *)(kernel_base+ 0xC00468);
	memcpy(DT_HASH_SEGMENT, kexec_data, kexec_size);

	void (*kexec_init)(void *, void *) = DT_HASH_SEGMENT;

	kexec_init((void *)(kernel_base+0x123280), NULL);

	// Say hello and put the kernel base in userland to we can use later
	printfkernel("PS4 Linux Loader for 6.72 by valentinbreiz\n");

	printfkernel("kernel base is:0x%016llx\n", kernel_base);

	void* uaddr;
	memcpy(&uaddr,&args[2],8);

	printfkernel("uaddr is:0x%016llx\n", uaddr);

	copyout(&kernel_base, uaddr, 8);

	return 0;
}

int _main(struct thread *td) {

	initKernel();
	initLibc();
	initNetwork();
	initPthread();
	initSysUtil();
	
#ifdef DEBUG_SOCKET
	struct sockaddr_in server;

	server.sin_len = sizeof(server);
	server.sin_family = AF_INET;
	server.sin_addr.s_addr = IP(DIP_1, DIP_2, DIP_3, DIP_4); //DEBUG_IPADDRESS);
	server.sin_port = sceNetHtons(9023);
	memset(server.sin_zero, 0, sizeof(server.sin_zero));
	sock = sceNetSocket("debug", AF_INET, SOCK_STREAM, 0);
	sceNetConnect(sock, (struct sockaddr *)&server, sizeof(server));
	int flag = 1;
	sceNetSetsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (char *)&flag, sizeof(int));
#endif
	printfsocket("Connected!\n");

	uint64_t* dump = mmap(NULL, 0x1000, PROT_READ | PROT_WRITE, MAP_ANONYMOUS | MAP_PRIVATE, -1, 0);

	printfsocket("Starting kernel patch...\n");

	syscall(11,kpayload,td,dump);

	printfsocket("Kernel patched, Kexec initialized!\n");

	printfsocket("Starting PS4 Linux Loader\n");

	usbthing();

	printfsocket("Done!\n");

	sceNetSocketClose(sock);

	return 0;

}

void notify(char *message)
{
	char buffer[512];
	sprintf(buffer, "%s\n\n\n\n\n\n\n", message);
	sceSysUtilSendSystemNotificationWithText(0x81, buffer);
}

FILE *getbzImage(){
	FILE *f = NULL;
	if ((f = fopen("/mnt/usb0/bzImage", "r"))) {printfsocket("OK: open /mnt/usb0/bzImage");return f;}
	if ((f = fopen("/mnt/usb1/bzImage", "r"))) {printfsocket("OK: open /mnt/usb1/bzImage");return f;}
	if ((f = fopen("/data/linux/boot/bzImage", "r"))) {printfsocket("OK: open /data/linux/boot/bzImage");return f;}

	notify("Linux: bzImage & initramfs.cpio.gz missing.");
	return NULL;
}

FILE *getinitramfs(){
	FILE *f = NULL;
	if ((f = fopen("/mnt/usb0/initramfs.cpio.gz", "r"))) {printfsocket("OK: open /mnt/usb0/initramfs.cpio.gz");return f;}
	if ((f = fopen("/mnt/usb1/initramfs.cpio.gz", "r"))) {printfsocket("OK: open /mnt/usb1/initramfs.cpio.gz");return f;}
	if ((f = fopen("/data/linux/boot/initramfs.cpio.gz", "r"))) {printfsocket("OK: open /data/linux/boot/initramfs.cpio.gz");return f;}

	notify("Linux: initramfs.cpio.gz missing.");
	return NULL;
}

char *getbootargs(){
        FILE *f = NULL;
        if ((f = fopen("/mnt/usb0/bootargs.txt", "r"))) {printfsocket("OK: open /mnt/usb0/bootargs.txt");}
        else if ((f = fopen("/mnt/usb1/bootargs.txt", "r"))) {printfsocket("OK: open /mnt/usb1/bootargs.txt");}
        else if ((f = fopen("/data/linux/boot/bootargs.txt", "r"))) {printfsocket("OK: open /data/linux/boot/bootargs.txt");}
	else{
//	        printfsocket("Failed to load bootargs.txt from:\n/mnt/usb0/bootargs.txt\n/mnt/usb1/bootargs.txt\n/data/linux/bootargs.txt");
		return NULL;
	}
	fseek(f, 0L, SEEK_END);
        size_t size = ftell(f);
        fseek(f, 0L, SEEK_SET);
	char *ret = (char*)malloc(size+1);
        fread(ret, size, 1, f);
	ret[size] = '\0';
	fclose(f);
	return ret;
}

void usbthing()
{

	printfsocket("Open bzImage\n");
	FILE *fkernel = getbzImage();
	if(!fkernel)
	{
		notify("Linux boot failed.");
		return;
	}
	fseek(fkernel, 0L, SEEK_END);
	int kernelsize = ftell(fkernel);
	fseek(fkernel, 0L, SEEK_SET);

	printfsocket("Open initramfs\n");
	FILE *finitramfs = getinitramfs();
	if(!finitramfs)
	{
		notify("Linux boot failed.");
		fclose(fkernel);
		return;
	}
	fseek(finitramfs, 0L, SEEK_END);
	int initramfssize = ftell(finitramfs);
	fseek(finitramfs, 0L, SEEK_SET);

	printfsocket("kernelsize = %d\n", kernelsize);
	printfsocket("initramfssize = %d\n", initramfssize);

	printfsocket("Checks if the files are here\n");
	if(kernelsize == 0 || initramfssize == 0) {
		printfsocket("no file error im dead");
		fclose(fkernel);
		fclose(finitramfs);
		return;
	}

	void *kernel, *initramfs;

	const char *cmd_line = NULL;
	if ((cmd_line = getbootargs()) == NULL){
		cmd_line = "panic=0 clocksource=tsc consoleblank=0 net.ifnames=0 radeon.dpm=0 amdgpu.dpm=0 drm.debug=0 console=uart8250,mmio32,0xd0340000 console=ttyS0,115200n8 console=tty0 video=HDMI-A-1:1920x1080-24@60";
	}

	kernel = malloc(kernelsize);
	initramfs = malloc(initramfssize);

	printfsocket("kernel = %llp\n", kernel);
	printfsocket("initramfs = %llp\n", initramfs);

	fread(kernel, kernelsize, 1, fkernel);
	fread(initramfs, initramfssize, 1, finitramfs);

	fclose(fkernel);
	fclose(finitramfs);

	//Call sys_kexec (153 syscall)
	syscall(153, kernel, kernelsize, initramfs, initramfssize, cmd_line);

	free(kernel);
	free(initramfs);

	//Reboot PS4
	int evf = syscall(540, "SceSysCoreReboot");
	syscall(546, evf, 0x4000, 0);
	syscall(541, evf);
	syscall(37, 1, 30);

}
