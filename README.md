How to fix CCWData code injection security vulnerability

https://github.com/bddjr/CCWData-Code-Injection-Fix/compare/compare^...compare

---

安装TamperMonkey，然后访问这个链接安装脚本，即可修复Gandi云数据扩展的代码注入(Code injection)漏洞：   
https://bddjr.github.io/CCWData-Code-Injection-Fix/CCWData-Code-Injection-Fix.user.js  

脚本的副作用：  
因为该脚本修复了漏洞，所以可能会被部分作品误认为使用了某安全审计工具。  

---

为什么会有这样的漏洞呢？我不知道，但我怀疑这大概率是扩展作者故意留的漏洞。  

扩展标注有两位作者，我并不清楚漏洞是哪位作者留的，如果是右边那位，他的最后活跃时间是2022年，也就是说，他早就跑路了，谴责他也没用。  

有人知道有漏洞，但故意不修，只是标记为“过时的积木”，然后隐藏起来，就当无事发生，然而只要漏洞还存在，用户的账号就还会暴露在风险之中。  

---

2025年12月，攻击者利用代码注入(Code injection)漏洞，篡改了访问者的账号昵称和头像，其中包括Gandi云数据扩展的代码注入漏洞。随后“鸭鸭院长”发表的[文章](https://learn.ccw.site/article/6af308a5-cb78-465c-bb1e-572c48f0fc5e)，仅提到某个第三方扩展的漏洞，却没有提到同时被攻击者利用的Gandi云数据扩展的代码注入漏洞。  

幸运的是，2026年1月16日，共创世界修复了list_sessions获取用户token的漏洞，攻击者不能再借助该漏洞盗号。但这并不代表风险完全解除了，只要作品的代码注入漏洞仍然存在，用户就仍然面临账号被攻击者用来执行恶意操作的风险。  
