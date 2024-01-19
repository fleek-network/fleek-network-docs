"use strict";(self.webpackChunkdocta=self.webpackChunkdocta||[]).push([[8668],{2618:(e,n,t)=>{t.d(n,{ZP:()=>l});var s=t(5893),i=t(1151);function a(e){const n={admonition:"admonition",code:"code",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(n.admonition,{type:"tip",children:[(0,s.jsxs)(n.p,{children:["Shutting down a Node after an Epoch can be tedious, given the remaining time an Epoch can take to end. Doing it prematurely, will cause reputation penalties, e.g. shutting down before the participation state change to offline. Therefore, a shutdown utility is available in the ",(0,s.jsx)(n.strong,{children:"Tools"})," menu option of ",(0,s.jsx)(n.code,{children:"get.fleek.network"}),"."]}),(0,s.jsx)(n.p,{children:"To access it, execute the command:"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"curl https://get.fleek.network | bash\n"})})]})}function l(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},139:(e,n,t)=>{t.d(n,{ZP:()=>l});var s=t(5893),i=t(1151);function a(e){const n={admonition:"admonition",p:"p",...(0,i.a)(),...e.components};return(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"To prevent any negative impact on the node's reputation, it's advisable to wait until the end of the Epoch (~24h) before shutting down the node when opting out. The same applies to nodes that have opted-in but are currently offline."})})}function l(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},1534:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>d,default:()=>g,frontMatter:()=>r,metadata:()=>c,toc:()=>u});var s=t(5893),i=t(1151),a=t(3872),l=t(2618),o=t(139);const r={title:"Frequently used commands for Native setup",slug:"frequently-used-commands-for-native-setup",hide_title:!0,tags:["commands","cli","lightning"]},d=void 0,c={id:"Lightning CLI/frequently-used-commands-for-native-setup",title:"Frequently used commands for Native setup",description:"TL;DR",source:"@site/references/Lightning CLI/frequently-used-commands-for-native-setup.md",sourceDirName:"Lightning CLI",slug:"/Lightning CLI/frequently-used-commands-for-native-setup",permalink:"/references/Lightning CLI/frequently-used-commands-for-native-setup",draft:!1,unlisted:!1,editUrl:"https://github.com/fleek-network/fleek-network-docs/edit/main/references/Lightning CLI/frequently-used-commands-for-native-setup.md",tags:[{label:"commands",permalink:"/references/tags/commands"},{label:"cli",permalink:"/references/tags/cli"},{label:"lightning",permalink:"/references/tags/lightning"}],version:"current",lastUpdatedAt:1705673252,formattedLastUpdatedAt:"Jan 19, 2024",frontMatter:{title:"Frequently used commands for Native setup",slug:"frequently-used-commands-for-native-setup",hide_title:!0,tags:["commands","cli","lightning"]},sidebar:"defaultSidebar",previous:{title:"File permissions and Ownership",permalink:"/references/Lightning CLI/file-permissions-and-ownership"},next:{title:"Keys not found",permalink:"/references/Lightning CLI/keys-not-found"}},h={},u=[{value:"TL;DR",id:"tldr",level:2},{value:"Systemctl Service Management",id:"systemctl-service-management",level:2},{value:"Enable",id:"enable",level:3},{value:"Disable",id:"disable",level:3},{value:"Start",id:"start",level:3},{value:"Stop",id:"stop",level:3},{value:"Restart",id:"restart",level:3},{value:"Status",id:"status",level:3},{value:"Lightning CLI",id:"lightning-cli",level:2},{value:"Show keys for user config",id:"show-keys-for-user-config",level:3},{value:"Network Participation management",id:"network-participation-management",level:3},{value:"Diagnostic tools",id:"diagnostic-tools",level:2},{value:"Extended verification health check",id:"extended-verification-health-check",level:3},{value:"Health status",id:"health-status",level:3},{value:"Node details",id:"node-details",level:3},{value:"Analyzing Logs",id:"analyzing-logs",level:2},{value:"Standard output",id:"standard-output",level:3},{value:"Standard error",id:"standard-error",level:3}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"tldr",children:"TL;DR"}),"\n",(0,s.jsxs)(n.p,{children:["Most assisted processes are available through the ",(0,s.jsx)(n.code,{children:"get.fleek.network"})," command, where you can select to install, do a health check amongst others."]}),"\n",(0,s.jsx)(n.p,{children:"To access the menu options run the command in the shell prompt:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"curl https://get.fleek.network | bash\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:["For Docker setup users read the corresponding version in the section ",(0,s.jsx)(n.a,{href:"/references/Docker/frequently-used-commands-for-docker-setup",children:"Frequently Used Commands for Docker Setup"})]})}),"\n",(0,s.jsx)(n.h2,{id:"systemctl-service-management",children:"Systemctl Service Management"}),"\n",(0,s.jsx)(n.h3,{id:"enable",children:"Enable"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"sudo systemctl enable lightning\n"})}),"\n",(0,s.jsx)(n.h3,{id:"disable",children:"Disable"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"sudo systemctl enable lightning\n"})}),"\n",(0,s.jsx)(n.h3,{id:"start",children:"Start"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"sudo systemctl start lightning\n"})}),"\n",(0,s.jsx)(n.h3,{id:"stop",children:"Stop"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"sudo systemctl stop lightning\n"})}),"\n",(0,s.jsx)(n.h3,{id:"restart",children:"Restart"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"sudo systemctl restart lightning\n"})}),"\n",(0,s.jsx)(n.h3,{id:"status",children:"Status"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"sudo systemctl status lightning\n"})}),"\n",(0,s.jsx)(n.h2,{id:"lightning-cli",children:"Lightning CLI"}),"\n",(0,s.jsx)(n.h3,{id:"show-keys-for-user-config",children:"Show keys for user config"}),"\n",(0,s.jsxs)(n.p,{children:["Show the keys by running the sub-commands ",(0,s.jsx)(n.code,{children:"keys show"})," and declaring the configuration file location:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"lgtn -c /home/<USERNAME>/.lightning/config.toml keys show\n"})}),"\n",(0,s.jsx)(n.h3,{id:"network-participation-management",children:"Network Participation management"}),"\n",(0,s.jsx)(n.p,{children:"Show help for opt into or opt out of network participation by:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"lgtn opt help\n"})}),"\n",(0,s.jsx)(n.p,{children:"The options are available should be made available to you as follows:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"Opt into or opt out of network participation\n\nUsage: lgtn opt [OPTIONS] <COMMAND>\n\nCommands:\n  in      Opt into network participation\n  out     Opt out of network participation. Run this command before shutting down your node\n  status  Query the participation status of your node\n"})}),"\n",(0,s.jsx)(n.p,{children:"For example, to opt-in you'd run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"lgtn opt in\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"To prevent any negative impact on the node's reputation, it's advisable to wait until the end of the Epoch (~24h) before shutting down the node when opting out. The same applies to nodes that have opted-in but are currently offline."})}),"\n",(0,s.jsx)(o.ZP,{}),"\n",(0,s.jsx)(l.ZP,{}),"\n",(0,s.jsx)(n.h2,{id:"diagnostic-tools",children:"Diagnostic tools"}),"\n",(0,s.jsx)(n.h3,{id:"extended-verification-health-check",children:"Extended verification health check"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"curl -sS https://get.fleek.network/healthcheck | bash\n"})}),"\n",(0,s.jsx)(n.h3,{id:"health-status",children:"Health status"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:'curl -w "\\n" localhost:4230/health\n'})}),"\n",(0,s.jsx)(n.h3,{id:"node-details",children:"Node details"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"curl -sS https://get.fleek.network/node_details | bash\n"})}),"\n",(0,s.jsx)(n.h2,{id:"analyzing-logs",children:"Analyzing Logs"}),"\n",(0,s.jsx)(n.h3,{id:"standard-output",children:"Standard output"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"tail -f /var/log/lightning/output.log\n"})}),"\n",(0,s.jsx)(n.h3,{id:"standard-error",children:"Standard error"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"tail -f /var/log/lightning/diagnostic.log\n"})}),"\n",(0,s.jsx)(a.Z,{name:"Helder Oliveira",image:"https://github.com/heldrida.png",title:"Software Developer + DX",url:"https://github.com/heldrida"})]})}function g(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}},3872:(e,n,t)=>{t.d(n,{Z:()=>i});t(7294);var s=t(5893);const i=e=>{let{image:n,name:t,title:i,url:a,communityMember:l=!1}=e;return(0,s.jsx)("section",{className:"author_card",children:(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"avatar",children:(0,s.jsx)("a",{href:a,target:"_blank",alt:t,children:(0,s.jsx)("img",{src:n,alt:t})})}),(0,s.jsxs)("div",{children:[(0,s.jsx)("span",{className:"name",children:(0,s.jsx)("a",{href:a,target:"_blank",alt:t,children:t})}),(0,s.jsx)("span",{className:"title",children:i}),(0,s.jsxs)("span",{className:"discord",children:[l?"Join our community on":"Got questions? Find us on"," ",(0,s.jsx)("a",{href:"https://discord.gg/fleek",target:"_blank",children:"discord!"})]})]})]})})}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>l});var s=t(7294);const i={},a=s.createContext(i);function l(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);