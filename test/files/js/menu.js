var menuData = {
  "Main": {
    "ID": "MainMenu",
    "class": "MenuClass",
    "style": "display:block",
    "payloads": [
      {
        "PL-Title": "Main Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains payloads to exploit and run homebrew on <br>your 9.00 firmware PS4.<br>Other payloads that are frequently used can also be found<br>here like FTP and Bin Loader.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "GoldHEN",
        "PL-Bin": "GoldHEN.bin",
        "PL-Ver": "By SiSTRo",
        "PL-Desc": "<b>* PRESS R1 TO CHANGE VERSION *<br>* PRESS L1 TO SET AutoLoad After Exploit ON/OFF *</b><br>Homebrew Enabler, Enable Debug Settings, PSVR Support,<br>External HDD Support, Remote PKG Installer Support,<br>Full Rest Mode Support, Debug Trophies Support, Enable UART,<br>Enable Blocked Screenshots, FTP Server on port 2121,<br>BinLoader Server on port 9090.",
        "Icon": "<img src=\"img/hen.svg\">",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Bin Loader",
        "PL-Bin": "BINLOADER",
        "PL-Ver": "v1.0 - By Specter",
        "PL-Desc": "Loads a bin or elf file sent to the PS4 IP address on port 9020.<br>Netcat or Netcat GUI is recommended to send the files to the PS4.",
        "Icon": "&#xf019;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "FTP Server",
        "PL-Bin": "pl_FTP.bin",
        "PL-Ver": "v1.08b -By hippie68",
        "PL-Desc": "A full access FTP server for the PS4.<br>Connect your FTP client to the IP address that the <br>popup message tells you.<br>The FTP port number is 1337.",
        "Icon": "<img src=\"img/ftp.svg\">",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "App2USB",
        "PL-Bin": "pl_App2usb.bin",
        "PL-Ver": "v5.0 - Original Version By Stooged / 9.00 Port By Al Azif",
        "PL-Desc": "Move installed games from your internal HDD to an<br>external exFAT formatted USB drive.<br>Put app2usb.ini in a folder named PS4 on root of your USB drive.<br><br>",
        "Icon": "&#xf01c;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Orbis Toolbox",
        "PL-Bin": "pl_OrbisTB.bin",
        "PL-Ver": "v1190 Alpha - By OSM-Made",
        "PL-Desc": "A modification of the playstation UI to help with<br>launching and developing homebrew..",
        "Icon": "&#xf0b1;",
        "FW": ["9.00","7.xx"]
      }
    ]
  },
  "Tools": {
    "ID": "ToolsMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Tools Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains tools to do various tasks and change things on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PSFree/Lapse Fix",
        "PL-Bin": "pl-PsfreeFix.bin",
        "PL-Ver": "v1.0.0 - By RandQalan /Payload By Nazky",
        "PL-Desc": "PSFree/Lapse Fix is a payload that uses a trick to fix the game's running problem. This payload installs a plugin on your console. Make sure to run the plugin on your device using GoldHEN.",
        "Icon": "&#xF0AD;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PS4Debug",
        "PL-Bin": "pl_PS4debug.bin",
        "PL-Ver": "v1.1.19 - By CTN",
        "PL-Desc": "PS4Debug for SaveMounter and Profile Activator.",
        "Icon": "&#xf188;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Kernel Dumper",
        "PL-Bin": "pl_KernelDumper.bin",
        "PL-Ver": "v1.0 - Original Version By Eversion / 9.00 Port By Al Azif",
        "PL-Desc": "Dump a copy of your kernel to your USB drive.<br><br>Your kernel will be dumped to: KernelDump.bin on your USB drive.",
        "Icon": "&#xf828;",
        "FW": ["9.00","7.xx"]
      },
      {
        "PL-Title": "History Blocker",
        "PL-Bin": "pl_HistoryBlocker.bin",
        "PL-Ver": "v2.0 - Original Version By Stooged / 9.00 Port By Al Azif",
        "PL-Desc": "Disable the auto opening of the last page used in the PS4 WebBrowser.<br><br>Run the payload again to disable this feature.",
        "Icon": "&#xf686;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Disable Updates",
        "PL-Bin": "pl_UpdatesDisable.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Creates dummy files in the PS4 update folder to prevent the download of unwanted system updates.<br>It also deletes any existing updates if they already exist.<br><br>! You only ever have to run this once !",
        "Icon": "&#xf771;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Enable Updates",
        "PL-Bin": "pl_UpdatesEnable.bin",
        "PL-Ver": "v1.0 - By Al Azif",
        "PL-Desc": "Removes the dummy files in the PS4 update folder to enable the download of updates again.<br><br>Run this if you have previously disabled updates and wish to update your console.",
        "Icon": "&#xf772;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Backup": {
    "ID": "BackupMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Backup Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "** More payloads will be added here soon... **<br>Contains various payloads to backup all aspect of useful things on your PS4.<br><br>NOTE! These backups will only work on your current Profile and accountID!<br>If you plan to initialize or replace your HDD you must also make a backup of your existing profile using the official backup/restore app in system settings!",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Database Backup",
        "PL-Bin": "pl_DBbackup.bin",
        "PL-Ver": "v1.0 - By Leeful",
        "PL-Desc": "Create a backup of important database files.<br><br>A backup of your app databases will be created and saved internally on your PS4 HDD and also to USB if a USB drive is inserted.",
        "Icon": "&#xf56e;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PKG-BackUP",
        "PL-Bin": "pl_PkgBackup.bin",
        "PL-Ver": "v1.2 - By Kameleon(kmeps4)",
        "PL-Desc": "Modded Version of App Dumper to Backup PKG files to External HDD",
        "Icon": "&#xF56D;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Restore": {
    "ID": "RestoreMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Restore Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "** More payloads will be added here soon... **<br>Contains various payloads to restore all aspect of useful things on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Database Restore",
        "PL-Bin": "pl_DBrestore.bin",
        "PL-Ver": "v1.0 - By Leeful",
        "PL-Desc": "Restore a backup of the database files created by 'Database Backup'<br><br>The backup will be restored from either the Internal HDD or from USB if a USB drive is inserted.<br>If a USB drive is inserted, the backup on the USB will be the one used to restore.",
        "Icon": "&#xf56f;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Dumper": {
    "ID": "DumperMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Game Dumper Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains payloads to dump games from your PS4 <br>so that you can then build your own fake packages that you can install.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Dump Game & Update",
        "PL-Bin": "pl_DumperGU.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump your game and game update (if there is one) into two seperate folders on your USB drive.<br>No config file is needed with this payload!",
        "Icon": "&#xf1b3;",
        "FW": ["9.00","7.xx"]
      },
      {
        "PL-Title": "Dump Game Only",
        "PL-Bin": "pl_DumperG.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump just your game on your USB drive.<br><br>No config file is needed with this payload!",
        "Icon": "&#xf1b2;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "Dump Update Only",
        "PL-Bin": "pl_DumperU.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump just your game update to your USB drive.<br><br>No config file is needed with this payload!",
        "Icon": "&#xf1b2;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "Dump & Merge Game + Update",
        "PL-Bin": "pl_DumperM.bin",
        "PL-Ver": "v1.9 - Original Version By xVortex / 9.00 Port and Mod By Leeful",
        "PL-Desc": "Dump your games or apps to a USB drive to be able to create fpkg files.<br><br>This payload will dump your game and game update (if there is one) and merge them into one folder on your USB drive.<br>No config file is needed with this payload!",
        "Icon": "&#xf1b3;",
        "FW": ["9.00", "7.xx"]
      }
    ]
  },
  "Spoof": {
    "ID": "SpoofMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Spoof Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains payloads to spoof various things on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Enable DEX Features",
        "PL-Bin": "pl_DEXenable.bin",
        "PL-Ver": "v1.0 - By notzecoxao",
        "PL-Desc": "Converts your Target ID to (DEX)<br><br>Adds new options in the game info menu to uninstall just DLC or just game updates.<br>To remove debug features just reboot your console or run To-Retail.",
        "Icon": "&#xf7f9;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Disable DEX Features",
        "PL-Bin": "pl_DEXdisable.bin",
        "PL-Ver": "v1.0 - By Leeful",
        "PL-Desc": "Converts your Target ID back to Retail (CEX)<br><br>Removes the DEX features.",
        "Icon": "&#xf7f9;",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  },
  "Game Mods": {
    "ID": "ModMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Game Mods Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains Mod Menus and Trainers for PS4 Games.<br><br>GTA V Mod Menus are compatable with different update versions of the game.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "PS4 Trainer (WebRTE)",
        "PL-Bin": "pl_WebRTE.bin",
        "PL-Ver": "v1.01 - By PS4 Trainer / 7.00 to 11.00 Port By EchoStretch",
        "PL-Desc": "Run payload then go to ps4trainer.com/Trainer/index.html<br>on any device to use trainers.",
        "Icon": "&#xf108;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "ArabicGuy Menu For GTA V v1.27",
        "PL-Bin": "pl_GTA_ArabicGuy127.bin",
        "PL-Ver": "v1.0 - By RF0oDxM0Dz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.27 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf5e1;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "ArabicGuy Menu For GTA V v1.32",
        "PL-Bin": "pl_GTA_ArabicGuy132.bin",
        "PL-Ver": "v1.0 - By RF0oDxM0Dz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.32 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf5e1;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "ArabicGuy Menu For GTA V v1.33",
        "PL-Bin": "pl_GTA_ArabicGuy133.bin",
        "PL-Ver": "v1.0 - By RF0oDxM0Dz",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.33 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf5e1;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "BeefQueefMod Menu For GTA V v1.33",
        "PL-Bin": "pl_GTA_Beef133.bin",
        "PL-Ver": "v1.0 - By GraFfiX_221211",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.33 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf63b;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "BeefQueefMod Menu For GTA V v1.34",
        "PL-Bin": "pl_GTA_Beef134.bin",
        "PL-Ver": "v1.0 - By GraFfiX_221211",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.34 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf63b;",
        "FW": ["9.00", "7.xx"]
      },
      {
        "PL-Title": "BeefQueefMod Menu For GTA V v1.38",
        "PL-Bin": "pl_GTA_Beef138.bin",
        "PL-Ver": "v1.0 - By GraFfiX_221211",
        "PL-Desc": "Mod Menu for GTA V<br>*Game update v1.38 must be installed.<br><br>Activate Menu With: 'D-Pad Right + Square'",
        "Icon": "&#xf63b;",
        "FW": ["9.00", "7.xx"]
      }
    ]
  },
  "Linux": {
    "ID": "LinuxMenu",
    "class": "MenuClass",
    "style": "display:none",
    "payloads": [
      {
        "PL-Title": "Linux Menu",
        "PL-Bin": "INFO",
        "PL-Ver": "Menu Info:",
        "PL-Desc": "Contains Linux Loader payloads to run Linux on your PS4.",
        "Icon": "&#xf30f;",
        "FW": ["9.xx","8.xx","7.xx"]
      },
      {
        "PL-Title": "Linux Loaders Will Be Added In A Later Release",
        "PL-Bin": "",
        "PL-Ver": "",
        "PL-Desc": "",
        "Icon": "<img src=\"img/linux.svg\">",
        "FW": ["9.xx","8.xx","7.xx"]
      }
    ]
  }
}
