    .section .rodata
    .global kexec_data
    .type   kexec_data, @object
    .align  4
kexec_data:
    .incbin "kexec.bin"

kexec_end:
    .global kexec_size
    .type   kexec_size, @object
    .align  4
kexec_size:
    .int    kexec_end - kexec_data
