"use strict";(self.webpackChunkdocta=self.webpackChunkdocta||[]).push([[1510],{7003:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>g,frontMatter:()=>o,metadata:()=>l,toc:()=>h});var r=t(5893),s=t(1151),i=t(3872);const o={title:"Backing up the keystore",slug:"backing-up-the-keystore",hide_title:!0,tags:["references","help","keystore","backup","restore"]},a=void 0,l={id:"Lightning CLI/keystore-backup",title:"Backing up the keystore",description:"The security of the private key is the responsibility of the user. Unfortunately, the Fleek Network team and any others are unable to help regain access to private key if lost or failed to secure them. The private keys are the user responsibility. The Fleek Network team doesn't endorse any methods of encryption and storage, the methods described here are for educational purposes only.",source:"@site/references/Lightning CLI/keystore-backup.md",sourceDirName:"Lightning CLI",slug:"/Lightning CLI/backing-up-the-keystore",permalink:"/references/Lightning CLI/backing-up-the-keystore",draft:!1,unlisted:!1,editUrl:"https://github.com/fleek-network/fleek-network-docs/edit/main/references/Lightning CLI/keystore-backup.md",tags:[{label:"references",permalink:"/references/tags/references"},{label:"help",permalink:"/references/tags/help"},{label:"keystore",permalink:"/references/tags/keystore"},{label:"backup",permalink:"/references/tags/backup"},{label:"restore",permalink:"/references/tags/restore"}],version:"current",lastUpdatedAt:1705064408,formattedLastUpdatedAt:"Jan 12, 2024",frontMatter:{title:"Backing up the keystore",slug:"backing-up-the-keystore",hide_title:!0,tags:["references","help","keystore","backup","restore"]},sidebar:"defaultSidebar",previous:{title:"Keys not found",permalink:"/references/Lightning CLI/keys-not-found"},next:{title:"Node secret key does not exist",permalink:"/references/Lightning CLI/node-secret-key-does-not-exist"}},c={},h=[{value:"Keystore pathname",id:"keystore-pathname",level:2},{value:"Configuration file settings",id:"configuration-file-settings",level:2},{value:"Loading the configuration file on runtime",id:"loading-the-configuration-file-on-runtime",level:2},{value:"Low security backup",id:"low-security-backup",level:2},{value:"Higher security",id:"higher-security",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsx)(n.p,{children:"The security of the private key is the responsibility of the user. Unfortunately, the Fleek Network team and any others are unable to help regain access to private key if lost or failed to secure them. The private keys are the user responsibility. The Fleek Network team doesn't endorse any methods of encryption and storage, the methods described here are for educational purposes only."})}),"\n",(0,r.jsx)(n.h2,{id:"keystore-pathname",children:"Keystore pathname"}),"\n",(0,r.jsxs)(n.p,{children:["The default location for the keystore is in the user home. The $HOME or ",(0,r.jsx)(n.code,{children:"~"})," refers to the user home, as such consider the logged-in username."]}),"\n",(0,r.jsx)(n.p,{children:"To Check the user you are logged in with:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"whoami\n"})}),"\n",(0,r.jsx)(n.p,{children:"The default location for the keystore is:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"$HOME/.lightning/keystore\n"})}),"\n",(0,r.jsx)(n.h2,{id:"configuration-file-settings",children:"Configuration file settings"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"config.toml"})," should have some and more of the following properties and values that are used to locate crucial files, such as the consensus and node keys of the keystore."]}),"\n",(0,r.jsxs)(n.p,{children:["Here's an incomplete example of how the ",(0,r.jsx)(n.code,{children:"config.toml"})," looks like:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:'[BLANK]\n...\n\n[application]\ndb_path = "~/.lightning/data/app_db"\n...\n\n[consensus]\nstore_path = "~/.lightning/data/narwhal_store"\n...\n\n[fsstore]\nroot = "~/.lightning/blockstore"\n...\n\n[resolver]\nstore_path = "~/.lightning/data/resolver_store"\n...\n\n[signer]\nconsensus_key_path = "~/.lightning/keystore/consensus.pem"\nnode_key_path = "~/.lightning/keystore/node.pem"\n...\n'})}),"\n",(0,r.jsxs)(n.p,{children:["If you've followed the installation recommendations, it's very likely that you'll have the username path defined at the base of the pathnames declared in the properties, such as the following except instead of ",(0,r.jsx)(n.code,{children:"<USERNAME>"})," you'll have your username:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:'[signer]\nconsensus_key_path = "/home/<USERNAME>/.lightning/keystore/consensus.pem"\nnode_key_path = "/home/<USERNAME>/.lightning/keystore/node.pem"\n'})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"config.toml"})," if loaded on Lightning node process runtime, will pick the desired paths declared in the file."]}),"\n",(0,r.jsx)(n.h2,{id:"loading-the-configuration-file-on-runtime",children:"Loading the configuration file on runtime"}),"\n",(0,r.jsxs)(n.p,{children:["Use the configuration flag ",(0,r.jsx)(n.code,{children:"-c"})," to pass the configuration ",(0,r.jsx)(n.code,{children:"config.toml"})," path:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"lgtn -c /home/<USERNAME>/.lightning/config.toml run\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Replace the ",(0,r.jsx)(n.code,{children:"<USERNAME>"})," with the correct username, where the config is located."]}),"\n",(0,r.jsxs)(n.p,{children:["Executing the subcommand ",(0,r.jsx)(n.code,{children:"run"})," without the configuration flag ",(0,r.jsx)(n.code,{children:"-c"}),", doesn't mean that it'll locate the desired ",(0,r.jsx)(n.code,{children:"config.toml"}),", as it'll default to ",(0,r.jsx)(n.code,{children:"$HOME/.lightning/config.toml"}),", e.g. if you were logged in with ",(0,r.jsx)(n.strong,{children:"root"}),", that'd be ",(0,r.jsx)(n.code,{children:"/root/.lightning/config.toml"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"low-security-backup",children:"Low security backup"}),"\n",(0,r.jsxs)(n.p,{children:["To zip and encrypt the ",(0,r.jsx)(n.code,{children:"$HOME/.lightning/keystore"})," directory run:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"# It'll prompt for password (remember)\nzip --encrypt -r keystore.zip.enc $HOME/.lightning/keystore\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To unzip and decrypt the ",(0,r.jsx)(n.code,{children:"keystore.zip.enc"}),", you'd run:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"# It'll prompt for password (recall)\nunzip keystore.zip.enc -d $HOME/.lightning/keystore\n"})}),"\n",(0,r.jsx)(n.h2,{id:"higher-security",children:"Higher security"}),"\n",(0,r.jsxs)(n.p,{children:["Create a ",(0,r.jsx)(n.code,{children:"tarbar"})," by executing:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:'tar -cf "keystore.tar" $HOME/.lightning/keystore\n'})}),"\n",(0,r.jsx)(n.p,{children:"The encryption command is:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo gpg -a --symmetric --cipher-algo AES256 keystore.tar\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To decrypt the ",(0,r.jsx)(n.code,{children:"keystore.tar.asc"})," file, enter:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo gpg -a --output keystore.tar --decrypt keystore.tar.asc\n"})}),"\n",(0,r.jsx)(n.p,{children:"Create a temporary directory to extract the tar archive with the original full pathname."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"mkdir $HOME/tar_keystore_extract\n"})}),"\n",(0,r.jsx)(n.p,{children:"Now, run the command to extract to the target directory, as follows:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"tar -xf keystore.tar -C $HOME/tar_keystore_extract\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Locate the extracted files in ",(0,r.jsx)(n.code,{children:"$HOME/tar_keystore_extract"}),", which should look like ",(0,r.jsx)(n.code,{children:"$HOME/tar_keystore/home/<USERNAME>/.lightning/keystore"})]}),"\n",(0,r.jsxs)(n.p,{children:["For a more in depth or step-by-step instructions read the guide ",(0,r.jsx)(n.a,{href:"/guides/Node%20Operators/managing-the-keystore",children:"managing the keystore"}),"."]}),"\n",(0,r.jsx)(i.Z,{name:"Helder Oliveira",image:"https://github.com/heldrida.png",title:"Software Developer + DX",url:"https://github.com/heldrida"})]})}function g(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},3872:(e,n,t)=>{t.d(n,{Z:()=>s});t(7294);var r=t(5893);const s=e=>{let{image:n,name:t,title:s,url:i,communityMember:o=!1}=e;return(0,r.jsx)("section",{className:"author_card",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"avatar",children:(0,r.jsx)("a",{href:i,target:"_blank",alt:t,children:(0,r.jsx)("img",{src:n,alt:t})})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"name",children:(0,r.jsx)("a",{href:i,target:"_blank",alt:t,children:t})}),(0,r.jsx)("span",{className:"title",children:s}),(0,r.jsxs)("span",{className:"discord",children:[o?"Join our community on":"Got questions? Find us on"," ",(0,r.jsx)("a",{href:"https://discord.gg/fleek",target:"_blank",children:"discord!"})]})]})]})})}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>o});var r=t(7294);const s={},i=r.createContext(s);function o(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);