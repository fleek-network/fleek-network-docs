"use strict";(self.webpackChunkdocta=self.webpackChunkdocta||[]).push([[2503],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,k=m["".concat(i,".").concat(d)]||m[d]||u[d]||l;return n?r.createElement(k,s(s({ref:t},c),{},{components:n})):r.createElement(k,s({ref:t},c))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,s=new Array(l);s[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[m]="string"==typeof e?e:a,s[1]=o;for(var p=2;p<l;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3533:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>s,default:()=>m,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const l={template:"post",draft:!1,hide_title:!1,title:"Uninstalling",slug:"uninstalling",date:new Date("2023-02-10T07:00:00.000Z"),canonical:"",description:"Uninstalling",category:"Reference",tags:["Reference","docker","Fleek Network","uninstall","remove","assisted-installer"]},s=void 0,o={unversionedId:"Assisted-installer/uninstalling",id:"Assisted-installer/uninstalling",title:"Uninstalling",description:"Uninstalling",source:"@site/reference/Assisted-installer/uninstalling.md",sourceDirName:"Assisted-installer",slug:"/Assisted-installer/uninstalling",permalink:"/reference/Assisted-installer/uninstalling",draft:!1,editUrl:"https://github.com/fleek-network/fleek-network-docs/edit/main/reference/Assisted-installer/uninstalling.md",tags:[{label:"Reference",permalink:"/reference/tags/reference"},{label:"docker",permalink:"/reference/tags/docker"},{label:"Fleek Network",permalink:"/reference/tags/fleek-network"},{label:"uninstall",permalink:"/reference/tags/uninstall"},{label:"remove",permalink:"/reference/tags/remove"},{label:"assisted-installer",permalink:"/reference/tags/assisted-installer"}],version:"current",lastUpdatedAt:1683714666,formattedLastUpdatedAt:"May 10, 2023",frontMatter:{template:"post",draft:!1,hide_title:!1,title:"Uninstalling",slug:"uninstalling",date:"2023-02-10T07:00:00.000Z",canonical:"",description:"Uninstalling",category:"Reference",tags:["Reference","docker","Fleek Network","uninstall","remove","assisted-installer"]},sidebar:"defaultSidebar",previous:{title:"Introduction",permalink:"/reference/"},next:{title:"Domain Name System nameserver troubleshooting",permalink:"/reference/DNS/domain-name-system-nameserver-troubleshooting"}},i={},p=[],c={toc:p};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"\u26a0\ufe0f Bear in mind that the applications mentioned might be in use by other applications, or were already installed before Ursa assisted the installer process or other methods. Uninstall at your responsibility!"),(0,a.kt)("p",null,"Find how to remove Docker images ",(0,a.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/reference/commandline/rm/"},"here")," and ",(0,a.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/reference/commandline/image_rm/"},"here")),(0,a.kt)("p",null,"List container ids"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker ps\n")),(0,a.kt)("p",null,"Remove a container id"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker rm <container id>\n")),(0,a.kt)("p",null,"Delete all existing containers"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker rm $(docker ps -q -f status=exited)\n")),(0,a.kt)("p",null,"Delete all stopped containers"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker rm $(docker ps -a -q)\n")),(0,a.kt)("p",null,"Delete All Running and Stopped Containers"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker stop $(docker ps -a -q)\ndocker rm $(docker ps -a -q)\n")),(0,a.kt)("p",null,"Remove all containers"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker container rm $(docker container ps -aq)\n")),(0,a.kt)("p",null,"Complete system cleanup"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker system prune\n")),(0,a.kt)("p",null,"Docker list images"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker images -a\n")),(0,a.kt)("p",null,"Remove image"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker rmi <image-id>\n")),(0,a.kt)("p",null,"Remove all images"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"docker rmi $(docker images -q)\n")),(0,a.kt)("p",null,"Uninstall docker, e.g., Ubuntu"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get purge docker-engine docker docker.io docker-ce docker-ce-cli docker-compose-plugin\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get autoremove --purge docker-engine docker docker.io docker-ce docker-compose-plugin\n")),(0,a.kt)("p",null,"Force delete docker images, containers, volumes, etc"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"rm -rf /var/lib/docker /etc/docker\nrm /etc/apparmor.d/docker\ngroupdel docker\nrm -rf /var/run/docker.sock\n")),(0,a.kt)("p",null,"Alternatively, for ",(0,a.kt)("inlineCode",{parentName:"p"},"snap")," package manager"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"snap remove docker\n")),(0,a.kt)("p",null,"Delete or remove the Ursa repository stored locally, which by default is installed at ",(0,a.kt)("inlineCode",{parentName:"p"},"$HOME/fleek-network/ursa")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"rm -rf $HOME/fleek-network/ursa\n")),(0,a.kt)("p",null,"Uninstall ",(0,a.kt)("inlineCode",{parentName:"p"},"jq")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get remove jq\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get purge --auto-remove jq \n")),(0,a.kt)("p",null,"Uninstall ",(0,a.kt)("inlineCode",{parentName:"p"},"yq")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get remove yq\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get purge --auto-remove yq \n")),(0,a.kt)("p",null,"Uninstall ",(0,a.kt)("inlineCode",{parentName:"p"},"whois")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get remove whois\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get purge --auto-remove whois\n")),(0,a.kt)("p",null,"Uninstall ",(0,a.kt)("inlineCode",{parentName:"p"},"tldextract")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get remove tldextract\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get purge --auto-remove tldextract\n")),(0,a.kt)("p",null,"Uninstall ",(0,a.kt)("inlineCode",{parentName:"p"},"dnsutils")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get remove dnsutils\n")),(0,a.kt)("p",null,"Uninstall ",(0,a.kt)("inlineCode",{parentName:"p"},"git")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"apt-get remove git\n")))}m.isMDXComponent=!0}}]);