修复“Gandi云数据”扩展的代码注入(Code injection)漏洞。

使用 iframe 隔离，外部对象在传给 eval 之前会被复制，关键函数防劫持，让 eval 无法获取外部对象，无法发起网络请求。

安装TamperMonkey，然后访问这个链接安装脚本即可：   
https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js  

> [!WARNING]
> 因为该脚本修复了漏洞，所以可能会影响部分作品的正常运行，可能会被部分作品误认为正在使用 CSense 。  
> 
> 该脚本与旧版 CSense 冲突，旧版 CSense 会使用有漏洞的函数覆盖 `getValueInJSON` 和 `setValueInJSON` 。  

> [!TIP]
> 您可能需要：   
> CCW代码注入风险警告，让你的账号更安全。  
> https://github.com/bddjr/CCW-Code-Injection-Risk-Warning  

---

源代码在 `src` 文件夹。

比较文件，以学习怎么修复漏洞:  
https://github.com/bddjr/CCWData-Code-Injection-Fix/compare/compare^..compare

---

2025年12月，攻击者利用代码注入(Code injection)漏洞，篡改了访问者的账号昵称和头像，其中包括Gandi云数据扩展的代码注入漏洞。  

幸运的是，2026年1月16日，共创世界修复了list_sessions获取用户token的漏洞，攻击者不能再借助该漏洞盗号。但这并不代表风险完全解除了，只要作品的代码注入漏洞仍然存在，用户就仍然面临账号被攻击者用来执行恶意操作的风险。  
