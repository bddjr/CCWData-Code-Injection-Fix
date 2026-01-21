如何修复“Gandi云数据”扩展的代码注入(Code injection)漏洞：  
https://github.com/bddjr/CCWData-Code-Injection-Fix/compare/compare^...compare

---

安装TamperMonkey，然后访问这个链接安装脚本，即可修复Gandi云数据扩展的代码注入(Code injection)漏洞：   
https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js  

> [!WARNING]
> 脚本的副作用：  
> 因为该脚本修复了漏洞，所以可能会被部分作品误认为使用了某安全审计工具。  

> [!TIP]
> 您可能需要：   
> CCW代码注入风险警告，让你的账号更安全。  
> https://github.com/bddjr/CCW-Code-Injection-Risk-Warning  

---

2025年12月，攻击者利用代码注入(Code injection)漏洞，篡改了访问者的账号昵称和头像，其中包括Gandi云数据扩展的代码注入漏洞。  

幸运的是，2026年1月16日，共创世界修复了list_sessions获取用户token的漏洞，攻击者不能再借助该漏洞盗号。但这并不代表风险完全解除了，只要作品的代码注入漏洞仍然存在，用户就仍然面临账号被攻击者用来执行恶意操作的风险。  
