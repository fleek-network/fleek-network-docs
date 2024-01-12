"use strict";(self.webpackChunkdocta=self.webpackChunkdocta||[]).push([[5767],{3183:(e,n,t)=>{t.d(n,{ZP:()=>s});var r=t(5893),o=t(1151);function i(e){const n={a:"a",admonition:"admonition",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsx)(n.p,{children:"You have several ways of doing this:"}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Clone via HTTPS"}),"\n",(0,r.jsx)(n.li,{children:"Clone via SSH"}),"\n",(0,r.jsx)(n.li,{children:"Download via Github CLI"}),"\n",(0,r.jsxs)(n.li,{children:["Download the ",(0,r.jsx)(n.a,{href:"https://github.com/fleek-network/lightning/archive/refs/heads/main.zip",children:"zip package"})," from the repository"]}),"\n"]}),(0,r.jsxs)(n.p,{children:["We recommend HTTPS because it is the easiest to set up in the wild, and by users who are new to all this.\nAlthough, we strongly recommend using an SSH connection when interacting with GitHub. If you are to this and are interested read more about it ",(0,r.jsx)(n.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh",children:"here"}),"."]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"git clone -b testnet-alpha-1 https://github.com/fleek-network/lightning.git <DIRECTORY-NAME>\n"})}),(0,r.jsxs)(n.p,{children:["At time of writing, we are checking the branch name ",(0,r.jsx)(n.code,{children:"testnet-alpha-1"})," that corresponds to the testnet phase.\nHere's an example of what it'd look like when sticking to the recommended path location:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"git clone -b testnet-alpha-1 https://github.com/fleek-network/lightning.git ~/fleek-network/lightning\n"})})]})}function s(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}},1583:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>m,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var r=t(5893),o=t(1151),i=t(3872);t(3183);const s={title:"Uninstall Docker Setup",slug:"uninstall-docker-setup",hide_title:!0,tags:["references","help","docker","image","container"]},c=void 0,l={id:"Docker/uninstall-docker-setup",title:"Uninstall Docker Setup",description:"Remove the source code locally",source:"@site/references/Docker/uninstall-docker-setup.md",sourceDirName:"Docker",slug:"/Docker/uninstall-docker-setup",permalink:"/references/Docker/uninstall-docker-setup",draft:!1,unlisted:!1,editUrl:"https://github.com/fleek-network/fleek-network-docs/edit/main/references/Docker/uninstall-docker-setup.md",tags:[{label:"references",permalink:"/references/tags/references"},{label:"help",permalink:"/references/tags/help"},{label:"docker",permalink:"/references/tags/docker"},{label:"image",permalink:"/references/tags/image"},{label:"container",permalink:"/references/tags/container"}],version:"current",lastUpdatedAt:1705064408,formattedLastUpdatedAt:"Jan 12, 2024",frontMatter:{title:"Uninstall Docker Setup",slug:"uninstall-docker-setup",hide_title:!0,tags:["references","help","docker","image","container"]},sidebar:"defaultSidebar",previous:{title:"Frequently used commands for Docker setup",permalink:"/references/Docker/frequently-used-commands-for-docker-setup"},next:{title:"Error building on ARM64",permalink:"/references/Lightning CLI/error-building-on-arm64"}},a={},d=[{value:"Remove the source code locally",id:"remove-the-source-code-locally",level:2},{value:"Stop the Docker service",id:"stop-the-docker-service",level:2},{value:"Confirm the Docker service status",id:"confirm-the-docker-service-status",level:2},{value:"Reload the daemon",id:"reload-the-daemon",level:2},{value:"Remove the Systemd Service Unit file",id:"remove-the-systemd-service-unit-file",level:2},{value:"Delete the Docker image",id:"delete-the-docker-image",level:2},{value:"Uninstall Docker",id:"uninstall-docker",level:2},{value:"Manage keys",id:"manage-keys",level:2},{value:"Remove the logs",id:"remove-the-logs",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"remove-the-source-code-locally",children:"Remove the source code locally"}),"\n",(0,r.jsx)(n.p,{children:"For users who build the Docker image from source-code."}),"\n",(0,r.jsxs)(n.p,{children:["Assuming the default installation source-code path ",(0,r.jsx)(n.code,{children:"~/fleek-network/lightning"}),", run the command:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"rm -rf ~/fleek-network/lightning\n"})}),"\n",(0,r.jsx)(n.p,{children:"If you have a custom path, you need to change the pathname to the correct path you have selected during your custom install."}),"\n",(0,r.jsx)(n.h2,{id:"stop-the-docker-service",children:"Stop the Docker service"}),"\n",(0,r.jsx)(n.p,{children:"The Fleek Network recommends systemctl to manage the services, either natively or docker. It's an interface that is easily to translate across the setups, and to communicate to the users in a common manner."}),"\n",(0,r.jsx)(n.p,{children:"If you have followed the recommendations, you should have the Systemd Unit Service setup."}),"\n",(0,r.jsx)(n.p,{children:"To stop the service run the command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo systemctl stop docker-lightning\n"})}),"\n",(0,r.jsx)(n.h2,{id:"confirm-the-docker-service-status",children:"Confirm the Docker service status"}),"\n",(0,r.jsx)(n.p,{children:"Check the status by:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo systemctl status docker-lightning\n"})}),"\n",(0,r.jsx)(n.p,{children:"Disable the service by:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo systemctl disable docker-lightning\n"})}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsxs)(n.p,{children:["Once stop, you can run the following command to confirm it is not running. If you have used the recommended container name ",(0,r.jsx)(n.code,{children:"lightning-node"})," the command you'd have to execute is:"]}),(0,r.jsxs)(n.p,{children:["You can check the Docker container isn't running by running the following command. Notice that we are assuming that your docker container name is the default ",(0,r.jsx)(n.code,{children:"lightning-node"}),". If you have customized the name use the correct selected name:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo docker container inspect -f '{{.State.Running}}' lightning-node\n"})})]}),"\n",(0,r.jsx)(n.h2,{id:"reload-the-daemon",children:"Reload the daemon"}),"\n",(0,r.jsx)(n.p,{children:"Reload the daemon by:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo systemctl daemon-reload\n"})}),"\n",(0,r.jsx)(n.h2,{id:"remove-the-systemd-service-unit-file",children:"Remove the Systemd Service Unit file"}),"\n",(0,r.jsx)(n.p,{children:"If you have followed the recommendations, you should find the Systemd Service Unit file at:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"/etc/systemd/system/docker-lightning\n"})}),"\n",(0,r.jsx)(n.p,{children:"To remove the file, run the command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"sudo rm -f /etc/systemd/system/docker-lightning\n"})}),"\n",(0,r.jsx)(n.h2,{id:"delete-the-docker-image",children:"Delete the Docker image"}),"\n",(0,r.jsxs)(n.p,{children:["For our example, we'll assume that the Docker image for Fleek Network is the default ",(0,r.jsx)(n.code,{children:"lightning-node"}),". If you have created the image under a different name, change in accordance to your preference."]}),"\n",(0,r.jsx)(n.p,{children:"Delete the image by running the following command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo docker rmi $(docker images | grep 'lightning-node')\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To learn more about the docker image remove command, visit the official documentation ",(0,r.jsx)(n.a,{href:"https://docs.docker.com/engine/reference/commandline/image_rm/",children:"here"})]}),"\n",(0,r.jsx)(n.h2,{id:"uninstall-docker",children:"Uninstall Docker"}),"\n",(0,r.jsx)(n.p,{children:"Uninstalling Docker should only be performed if you don't need in your system. If you already had Docker for some purpose, you should not have to uninstall it."}),"\n",(0,r.jsxs)(n.p,{children:["Visit the Docker official documentation site for uninstall instructions ",(0,r.jsx)(n.a,{href:"https://docs.docker.com/desktop/uninstall/",children:"here"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"manage-keys",children:"Manage keys"}),"\n",(0,r.jsxs)(n.p,{children:["The configuration directory of Fleek Network is in the host machine file system. This is the directory where you can find the ",(0,r.jsx)(n.code,{children:"config.toml"}),", ",(0,r.jsx)(n.code,{children:"keystore"})," for the public keys, amongst others."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"/home/<USERNAME>/.lightning\n"})}),"\n",(0,r.jsxs)(n.p,{children:["For example, for the user ",(0,r.jsx)(n.code,{children:"lgtn"})," the location of these files is:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"/home/lgtn/.lightning\n"})}),"\n",(0,r.jsx)(n.admonition,{title:"warning",type:"caution",children:(0,r.jsx)(n.p,{children:"The directory can be deleted but have in mind that the keystore is located here. If you need to backup the keystore, be careful as this is not possible to recover by anyone. The keys are your responsibility."})}),"\n",(0,r.jsxs)(n.p,{children:["To learn more about the keystore read the guide ",(0,r.jsx)(n.a,{href:"/guides/Node%20Operators/managing-the-keystore",children:"managing the keystore"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["If you are happy to delete the directory, run the following command by replacing the ",(0,r.jsx)(n.code,{children:"<USERNAME>"})," by yours:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"rm -rf /home/<USERNAME>/.lightning\n"})}),"\n",(0,r.jsx)(n.h2,{id:"remove-the-logs",children:"Remove the logs"}),"\n",(0,r.jsx)(n.p,{children:"The Docker container generates output to stdout and stderr. All the content is stored in the location:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"/var/log/lightning\n"})}),"\n",(0,r.jsx)(n.p,{children:"To completely remove the directory run the command:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo rm -rf /var/log/lightning\n"})}),"\n",(0,r.jsx)(i.Z,{name:"Helder Oliveira",image:"https://github.com/heldrida.png",title:"Software Developer + DX",url:"https://github.com/heldrida"})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},3872:(e,n,t)=>{t.d(n,{Z:()=>o});t(7294);var r=t(5893);const o=e=>{let{image:n,name:t,title:o,url:i,communityMember:s=!1}=e;return(0,r.jsx)("section",{className:"author_card",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"avatar",children:(0,r.jsx)("a",{href:i,target:"_blank",alt:t,children:(0,r.jsx)("img",{src:n,alt:t})})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"name",children:(0,r.jsx)("a",{href:i,target:"_blank",alt:t,children:t})}),(0,r.jsx)("span",{className:"title",children:o}),(0,r.jsxs)("span",{className:"discord",children:[s?"Join our community on":"Got questions? Find us on"," ",(0,r.jsx)("a",{href:"https://discord.gg/fleek",target:"_blank",children:"discord!"})]})]})]})})}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>s});var r=t(7294);const o={},i=r.createContext(o);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);