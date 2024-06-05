"use strict";(self.webpackChunkdocta=self.webpackChunkdocta||[]).push([[6296],{9237:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>d,default:()=>p,frontMatter:()=>c,metadata:()=>l,toc:()=>u});var i=t(5893),r=t(1151),o=t(3872),s=t(3183),a=t(8432);const c={title:"Running a node in Docker",hide_title:!0,slug:"running-a-node-in-docker",image:"./assets/running-a-node-in-docker.png?202311181211",date:new Date("2023-09-18T17:00:00.000Z"),description:"A guide on how to run Fleek Network's node in a Docker container",category:"Tutorial",tags:["guide","docker","container"]},d=void 0,l={id:"Node Operators/running-a-node-in-docker",title:"Running a node in Docker",description:"A guide on how to run Fleek Network's node in a Docker container",source:"@site/guides/Node Operators/running-a-node-in-docker.md",sourceDirName:"Node Operators",slug:"/Node Operators/running-a-node-in-docker",permalink:"/guides/Node Operators/running-a-node-in-docker",draft:!1,unlisted:!1,editUrl:"https://github.com/fleek-network/fleek-network-docs/edit/main/guides/Node Operators/running-a-node-in-docker.md",tags:[{label:"guide",permalink:"/guides/tags/guide"},{label:"docker",permalink:"/guides/tags/docker"},{label:"container",permalink:"/guides/tags/container"}],version:"current",lastUpdatedAt:1717608817,formattedLastUpdatedAt:"Jun 5, 2024",frontMatter:{title:"Running a node in Docker",hide_title:!0,slug:"running-a-node-in-docker",image:"./assets/running-a-node-in-docker.png?202311181211",date:"2023-09-18T17:00:00.000Z",description:"A guide on how to run Fleek Network's node in a Docker container",category:"Tutorial",tags:["guide","docker","container"]},sidebar:"defaultSidebar",previous:{title:"Managing the keystore",permalink:"/guides/Node Operators/managing-the-keystore"},next:{title:"Transfering setup ownership",permalink:"/guides/Node Operators/transfering-setup-ownership"}},h={image:t(3451).Z},u=[{value:"Introduction",id:"introduction",level:2},{value:"Pre-requisites",id:"pre-requisites",level:2},{value:"For the impatient",id:"for-the-impatient",level:2},{value:"Pull and run image",id:"pull-and-run-image",level:3},{value:"Setup",id:"setup",level:2},{value:"Requirements",id:"requirements",level:3},{value:"Create a user",id:"create-a-user",level:3},{value:"Lightning CLI source code",id:"lightning-cli-source-code",level:3},{value:"Change directory to Lightning source code",id:"change-directory-to-lightning-source-code",level:3},{value:"Install Docker",id:"install-docker",level:3},{value:"Create the Docker image",id:"create-the-docker-image",level:3},{value:"Build the Docker image",id:"build-the-docker-image",level:3},{value:"Docker Container",id:"docker-container",level:2},{value:"Generate keys",id:"generate-keys",level:2},{value:"Run the Docker Container as Systemd Service",id:"run-the-docker-container-as-systemd-service",level:2},{value:"Create the Systemd Service Unit",id:"create-the-systemd-service-unit",level:3},{value:"Viewing logs",id:"viewing-logs",level:2},{value:"Conclusion",id:"conclusion",level:2}];function g(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Running a node in Docker",src:t(8597).Z+"",width:"1450",height:"816"})}),"\n","\n","\n",(0,i.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsxs)(n.p,{children:["Our ",(0,i.jsx)(n.a,{href:"https://www.docker.com/",children:"Docker"})," ",(0,i.jsx)(n.a,{href:"https://docs.docker.com/engine/reference/commandline/images/",children:"image"})," provides all the requirements to have Fleek Network running quickly and the following guide will provide you a quick reference to get you started with Docker."]}),"\n",(0,i.jsxs)(n.p,{children:["Alternatively, if you need a deep dive into Docker, check the official getting started ",(0,i.jsx)(n.a,{href:"https://docs.docker.com/get-started/",children:"here"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["TL;DR If you have Docker experience then you'll find our ",(0,i.jsx)(n.a,{href:"#for-the-impatient",children:"for the impatient"})," sufficient to get started."]}),"\n",(0,i.jsx)(n.h2,{id:"pre-requisites",children:"Pre-requisites"}),"\n",(0,i.jsx)(n.p,{children:"To follow the guide, you will need the following:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Familiarity with the command-line interface"}),"\n",(0,i.jsx)(n.li,{children:"Git"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"for-the-impatient",children:"For the impatient"}),"\n",(0,i.jsxs)(n.p,{children:["Building a Docker image requires some effort and some of our users might find it easier to pull our ",(0,i.jsx)(n.a,{href:"https://github.com/fleek-network/lightning/pkgs/container/lightning",children:"latest image"})," for quick access to Lightning CLI, which doesn't require them to build from source."]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["The Docker Container image for Lightning is located at ",(0,i.jsx)(n.a,{href:"https://github.com/fleek-network/lightning/pkgs/container/lightning",children:"https://github.com/fleek-network/lightning/pkgs/container/lightning"}),"."]})}),"\n",(0,i.jsx)(n.h3,{id:"pull-and-run-image",children:"Pull and run image"}),"\n",(0,i.jsx)(n.p,{children:"You can pull and run the Lightning pre-built Docker image from our GitHub and run the Docker container quickly by executing the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker run \\\n    -p 4200-4299:4200-4299 \\\n    -p 4300-4399:4300-4399 \\\n    --mount type=bind,source=$HOME/.lightning,target=/home/lgtn/.lightning \\\n    --mount type=bind,source=/var/tmp,target=/var/tmp \\\n    --name lightning-node \\\n    -it ghcr.io/fleek-network/lightning:latest\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["Keys have to be generated when launching the service. On Docker run, if the ",(0,i.jsx)(n.a,{href:"/guides/Node%20Operators/managing-the-keystore",children:"keystore"})," is not found, the keys are automatically generated and stored in the Docker host's ",(0,i.jsx)(n.code,{children:"$HOME/.lightning/keystore"})," directory. To learn more about how to manage the keystore, visit the ",(0,i.jsx)(n.a,{href:"/guides/Node%20Operators/managing-the-keystore",children:"managing keystore"})," section."]})}),"\n",(0,i.jsx)(n.admonition,{title:"warning",type:"caution",children:(0,i.jsxs)(n.p,{children:["The Docker image is tied to a CPU architecture, make sure that you have verified the ",(0,i.jsx)(n.a,{href:"/docs/node/requirements#specs",children:"required"})," specifications to run the container successfully."]})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["The command has a list of ports ",(0,i.jsx)(n.code,{children:"-p"})," values that map ports in the container on the Docker host. While we try to keep the information across our documentation in sync with the latest changes or requirements e.g. port number changes, make sure that you check the section ",(0,i.jsx)(n.a,{href:"/docs/node/requirements#ports",children:"ports"})," to find the latest updates."]})}),"\n",(0,i.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,i.jsx)(n.h3,{id:"requirements",children:"Requirements"}),"\n",(0,i.jsx)(n.p,{children:"To follow the guide successfully, a good amount of memory and disk space is necessary to run Docker. The main reason for our use-case is that your host machine requires a generous amount of memory and disk space, for the containers."}),"\n",(0,i.jsxs)(n.p,{children:["For this guide, we used a server with the 4vCPU, 32\xa0GB ram memory and 20 GB disk space specifications. Learn more about the recommended specifications ",(0,i.jsx)(n.a,{href:"/docs/node/requirements",children:"here"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"create-a-user",children:"Create a user"}),"\n",(0,i.jsx)(a.ZP,{}),"\n",(0,i.jsx)(n.h3,{id:"lightning-cli-source-code",children:"Lightning CLI source code"}),"\n",(0,i.jsxs)(n.p,{children:["Start by cloning the repository located at ",(0,i.jsx)(n.a,{href:"https://github.com/fleek-network/lightning",children:"https://github.com/fleek-network/lightning"}),"."]}),"\n",(0,i.jsx)(s.ZP,{}),"\n",(0,i.jsx)(n.h3,{id:"change-directory-to-lightning-source-code",children:"Change directory to Lightning source code"}),"\n",(0,i.jsxs)(n.p,{children:["If you have cloned the project correctly, you should ",(0,i.jsx)(n.code,{children:"change directory"})," to the project source code directory which by default is ",(0,i.jsx)(n.code,{children:"~/fleek-network/lightning"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"cd ~/fleek-network/lightning\n"})}),"\n",(0,i.jsxs)(n.p,{children:["At time of writing, this is how the project root looks like (e.g. use the ",(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Ls",children:"ls"})," to see the list):"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:".\n\u251c\u2500\u2500 CODE_OF_CONDUCT.md\n\u251c\u2500\u2500 CONTRIBUTING.md\n\u251c\u2500\u2500 Cargo.lock\n\u251c\u2500\u2500 Cargo.toml\n\u251c\u2500\u2500 Dockerfile\n\u251c\u2500\u2500 LICENSE\n\u251c\u2500\u2500 README.md\n\u251c\u2500\u2500 codecov.yml\n\u251c\u2500\u2500 core\n\u251c\u2500\u2500 docs\n\u251c\u2500\u2500 etc\n\u251c\u2500\u2500 lib\n\u251c\u2500\u2500 rust-toolchain\n\u251c\u2500\u2500 rustfmt.toml\n\u251c\u2500\u2500 services\n\u2514\u2500\u2500 target\n"})}),"\n",(0,i.jsx)(n.h3,{id:"install-docker",children:"Install Docker"}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["To keep our guide short, we're using Ubuntu Linux. You'll have to make the required tweaks for your preferred Linux Distro. Find the list of support operating systems ",(0,i.jsx)(n.a,{href:"/docs/node/requirements#server",children:"here"}),"."]})}),"\n",(0,i.jsx)(n.p,{children:"First, update the existing list of packages:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo apt update\n"})}),"\n",(0,i.jsx)(n.p,{children:"Next, install the required packages to let apt use packages over HTTPS:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo apt install apt-transport-https ca-certificates software-properties-common\n"})}),"\n",(0,i.jsx)(n.p,{children:"Add the GPG key for the official Docker repository to your system:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\n"})}),"\n",(0,i.jsx)(n.p,{children:"Add the Docker repository to apt sources and update the package database with the Docker packages from the new added repository:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:'sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu jammy stable"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Set to install from the Docker repo instead of the default Ubuntu repo:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"apt-cache policy docker-ce\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"docker-ce:\n  Installed: (none)\n  Candidate: 5:24.0.6-1~ubuntu.22.04~jammy\n  Version table:\n     5:24.0.6-1~ubuntu.22.04~jammy 500\n        500 https://download.docker.com/linux/ubuntu jammy/stable amd64 Packages\n     5:24.0.6-1~ubuntu.22.04~jammy 500\n"})}),"\n",(0,i.jsx)(n.p,{children:"Finally, install Docker:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo apt install docker-ce\n"})}),"\n",(0,i.jsx)(n.p,{children:"Once complete you should be able to run it via the CLI, as such:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"docker -v\n"})}),"\n",(0,i.jsx)(n.p,{children:"Here's the output (versions might differ a bit from the time of writing):"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"Docker version 24.0.6, build ed223bc\n"})}),"\n",(0,i.jsx)(n.p,{children:"The following command's output will indicate if Docker's working correctly:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker run hello-world\n"})}),"\n",(0,i.jsx)(n.p,{children:"Here's an example of the output you'll find us \"Hello from Docker!\":"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:'Hello from Docker!\nThis message shows that your installation appears to be working correctly.\n\nTo generate this message, Docker took the following steps:\n 1. The Docker client contacted the Docker daemon.\n 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.\n    (amd64)\n 3. The Docker daemon created a new container from that image which runs the\n    executable that produces the output you are currently reading.\n 4. The Docker daemon streamed that output to the Docker client, which sent it\n    to your terminal.\n\nTo try something more ambitious, you can run an Ubuntu container with:\n $ docker run -it ubuntu bash\n\nShare images, automate workflows, and more with a free Docker ID:\n https://hub.docker.com/\n\nFor more examples and ideas, visit:\n https://docs.docker.com/get-started/\n'})}),"\n",(0,i.jsx)(n.p,{children:"Run all the commands above in your terminal, to confirm everything's working before proceeding to the next steps."}),"\n",(0,i.jsx)(n.h3,{id:"create-the-docker-image",children:"Create the Docker image"}),"\n",(0,i.jsx)(n.p,{children:"A Docker image is a read-only template with instructions for creating a Docker container, like a template. Docker images also act as a starting point when using Docker."}),"\n",(0,i.jsx)(n.p,{children:'The starting point for our use-case is a Dockerfile, where all those "template instructions" are declared.'}),"\n",(0,i.jsxs)(n.p,{children:["A ",(0,i.jsx)(n.a,{href:"https://raw.githubusercontent.com/fleek-network/lightning/main/Dockerfile",children:"Dockerfile"})," should exist in the repository source code, so make sure you have ",(0,i.jsx)(n.a,{href:"#change-directory-to-lightning-source-code",children:"change directory to the lightning source code"})," to find it."]}),"\n",(0,i.jsx)(n.h3,{id:"build-the-docker-image",children:"Build the Docker image"}),"\n",(0,i.jsxs)(n.p,{children:["Build the image named as ",(0,i.jsx)(n.code,{children:"lightning"})," from our Dockerfile:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker build -t lightning -f ./Dockerfile .\n"})}),"\n",(0,i.jsx)(n.p,{children:"The build process takes awhile, and you have to wait for completion."}),"\n",(0,i.jsx)(n.p,{children:"The output should be similar to:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"[+] Building 1.2s (16/16) FINISHED                                                                                                     docker:default\n => [internal] load build definition from Dockerfile                                                                                             0.0s\n => => transferring dockerfile: 990B                                                                                                             0.0s\n => [internal] load .dockerignore                                                                                                                0.0s\n => => transferring context: 2B                                                                                                                  0.0s\n => [internal] load metadata for docker.io/library/debian:bullseye-slim                                                                          0.6s\n => [internal] load metadata for docker.io/library/rust:latest                                                                                   0.9s\n => [stage-1 1/3] FROM docker.io/library/debian:bullseye-slim@sha256:3bc5e94a0e8329c102203c3f5f26fd67835f0c81633dd6949de0557867a87fac            0.0s\n => [builder 1/7] FROM docker.io/library/rust:latest@sha256:8a4ca3ca75afbc97bcf5362e9a694fe049d15734fbbaf82b8b7e224616c1254b                     0.0s\n => [internal] load build context                                                                                                                0.3s\n => => transferring context: 948.93kB                                                                                                            0.3s\n => CACHED [stage-1 2/3] RUN DEBIAN_FRONTEND=noninteractive apt-get update -yq &&   DEBIAN_FRONTEND=noninteractive apt-get install -yq     libs  0.0s\n => CACHED [builder 2/7] WORKDIR /lightning                                                                                                      0.0s\n => CACHED [builder 3/7] RUN apt-get update                                                                                                      0.0s\n => CACHED [builder 4/7] RUN apt-get install -y     build-essential     cmake     clang     pkg-config     libssl-dev     gcc     protobuf-comp  0.0s\n => CACHED [builder 5/7] RUN --mount=type=cache,target=/usr/local/cargo/registry     cargo install cargo-strip                                   0.0s\n => CACHED [builder 6/7] COPY . .                                                                                                                0.0s\n => CACHED [builder 7/7] RUN --mount=type=cache,target=/usr/local/cargo/registry     --mount=type=cache,target=/lightning/target     cargo buil  0.0s\n => CACHED [stage-1 3/3] COPY --from=builder /lightning/target/release/lightning-node /usr/local/bin/lgtn                                        0.0s\n => exporting to image                                                                                                                           0.0s\n => => exporting layers                                                                                                                          0.0s\n => => writing image sha256:e8e5ed19f59c3cc6a9add5bdb578c464904e9789d5f386cc4af81044c062d998                                                     0.0s\n => => naming to docker.io/library/lightning\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["The Docker image is only required to be built once and/or, when changes are pulled from the remote repository, or specific versions you might be interested in. Otherwise, you're not required to build it every time to run the node. If you'd like to learn how to update the Lightning CLI, find our references ",(0,i.jsx)(n.a,{href:"/references/Lightning%20CLI/update-cli-from-source-code",children:"here"}),"."]})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsx)(n.p,{children:"If you don't update your source code and binary build often, you won't have the latest changes, which should happen frequently to take advantage of all the ongoing development. This is quite important to understand, as it causes confusion to some users. The Lightning application at time of writing does not update automatically."})}),"\n",(0,i.jsx)(n.h2,{id:"docker-container",children:"Docker Container"}),"\n",(0,i.jsxs)(n.p,{children:["A container is what's originated from the image we discussed in the section ",(0,i.jsx)(n.a,{href:"#build-the-docker-image",children:"build the docker image"}),", it is a run-able instance of an image. We can create, start, stop, move, or delete a container using the Docker API or CLI."]}),"\n",(0,i.jsx)(n.p,{children:"Following up, we'll learn how to run the Docker container that includes our Lightning CLI program, built from our Dockerfile."}),"\n",(0,i.jsxs)(n.p,{children:["Once the ",(0,i.jsx)(n.a,{href:"#build-the-docker-image",children:"Docker image"})," is ready, run the container based on the image ",(0,i.jsx)(n.code,{children:"lightning"}),". Effectively running the Fleek Network Lightning node process:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker run \\\n    -p 4200-4299:4200-4299 \\\n    -p 4300-4399:4300-4399 \\\n    --mount type=bind,source=$HOME/.lightning,target=/home/lgtn/.lightning \\\n    --mount type=bind,source=/var/tmp,target=/var/tmp \\\n    --name lightning-node \\\n    -it ghcr.io/fleek-network/lightning:latest\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Notice that the command arguments we pass are for the flag's ",(0,i.jsx)(n.code,{children:"-p"})," port numbers, ",(0,i.jsx)(n.code,{children:"-v"})," to bind mount a location in your host to a container path (useful to persist your configuration files, e.g. keystore), ",(0,i.jsx)(n.code,{children:"--name"})," to make it easier to identify, ",(0,i.jsx)(n.code,{children:"-it"})," to make it interactive (e.g. presents output to the terminal), and the image name we ",(0,i.jsx)(n.a,{href:"#build-the-docker-image",children:"built earlier"}),"."]})}),"\n",(0,i.jsx)(n.p,{children:'The output would look as the following, showing the error message "Node is not whitelisted" (this error message is due to the testnet phase that requires nodes to be whitelisted to run successfully):'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"thread 'main' panicked at 'Node is not whitelisted. Please join the Fleek Discord to get invited.', core/cli/src/testnet_sync.rs:45:9\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n/root/init: line 7:     7 Aborted                 (core dumped) lgtn run\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Keys have to be generated when launching the service. On Docker run, if the ",(0,i.jsx)(n.a,{href:"/guides/Node%20Operators/managing-the-keystore",children:"keystore"})," is not found, the keys are automatically generated and stored in the Docker host's ",(0,i.jsx)(n.code,{children:"$HOME/.lightning/keystore"})," directory."]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Have in mind that the ",(0,i.jsx)(n.code,{children:"$HOME/.lightning/config.toml"})," is where the keystore location paths are configured, which default value is in the user ",(0,i.jsx)(n.code,{children:"$HOME"})," path. The users who customize or modify the default location, need to apply the required customizations. To learn more about how to manage the keystore, visit the ",(0,i.jsx)(n.a,{href:"/guides/Node%20Operators/managing-the-keystore",children:"managing keystore"})," section."]})}),"\n",(0,i.jsx)(n.h2,{id:"generate-keys",children:"Generate keys"}),"\n",(0,i.jsxs)(n.p,{children:["Execute the ",(0,i.jsx)(n.code,{children:"keys generate"})," command on the container ",(0,i.jsx)(n.code,{children:"lightning-node"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker exec -it lightning-node lgtn keys generate\n"})}),"\n",(0,i.jsxs)(n.p,{children:["We've bound the host path ",(0,i.jsx)(n.code,{children:"~/.lightning"})," into the container ",(0,i.jsx)(n.code,{children:"/home/lgtn/.lightning"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["You can list the contents of the ",(0,i.jsx)(n.code,{children:"~/.lightning"}),", where you should find the ",(0,i.jsx)(n.code,{children:"config.toml"})," and ",(0,i.jsx)(n.code,{children:"keystore"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:".\n..\nconfig.toml\nkeystore\n"})}),"\n",(0,i.jsxs)(n.p,{children:["You only have to run the ",(0,i.jsx)(n.code,{children:"keys generate"})," once from your host."]}),"\n",(0,i.jsx)(n.p,{children:"Finally, you can start the Fleek Network node by running the command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker start lightning-node\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"lightning-node"})," is the name we provided on first run as described in ",(0,i.jsx)(n.a,{href:"#docker-container",children:"docker container"})," section. If you have set a different name, change accordingly."]})}),"\n",(0,i.jsx)(n.h2,{id:"run-the-docker-container-as-systemd-service",children:"Run the Docker Container as Systemd Service"}),"\n",(0,i.jsxs)(n.p,{children:["In this section we\u2019ll cover how to wrap a Docker Container as a Systemd Service without the need for third party tools or complex commands. Some reasons include, minimizing the dependency on the Docker Daemon as we can move to an ",(0,i.jsx)(n.a,{href:"https://opencontainers.org/",children:"OCI complaint solution"})," other that Docker at anytime, or the fact we recommend Systemd Service Units and Systemctl to control the Service in our ",(0,i.jsx)(n.a,{href:"/docs/node/install",children:"Native install"})," that most users are familiar. Our goal is to provide guidance to the widest audience possible, if you have other preferences on managing your service that is more fitting to your needs that's fine."]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Docker recommends using their cross-platform built-in restart policy for running a Container as a Service. For that, configure your Docker service to ",(0,i.jsx)(n.a,{href:"https://docs.docker.com/install/linux/linux-postinstall/#configure-docker-to-start-on-boot",children:"start on system boot"}),"."]})}),"\n",(0,i.jsx)(n.p,{children:"Systemd was specifically developed to serve the purpose of stopping services, dependency checking and recovery of failed services. You can have your host start, stop, enable, check the status, and generally manage a container as a Systemd Service."}),"\n",(0,i.jsx)(n.h3,{id:"create-the-systemd-service-unit",children:"Create the Systemd Service Unit"}),"\n",(0,i.jsxs)(n.p,{children:["We are going to create the unit configuration file in the /etc/systemd/system/ directory. The Service Unit is going to be named as ",(0,i.jsx)(n.code,{children:"docker-lightning.service"}),". To create the file run the following command:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo touch /etc/systemd/system/docker-lightning.service\n"})}),"\n",(0,i.jsx)(n.p,{children:"Open the file in your favorite text editor and populate with the content found here:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"[Unit]\nDescription=Fleek Network Node lightning service\nAfter=docker.service\nRequires=docker.service\n\n[Service]\nRestart=always\nRestartSec=5\nTimeoutStartSec=0\nExecStartPre=-/usr/bin/docker kill lightning-node\nExecStartPre=-/usr/bin/docker rm lightning-node\nExecStartPre=/usr/bin/docker pull ghcr.io/fleek-network/lightning:latest\nExecStart=/usr/bin/docker run -p 4200-4299:4200-4299 -p 4300-4399:4300-4399 --mount type=bind,source=/home/skywalker/.lightning,target=/home/lgtn/.lightning --mount type=bind,source=/var/tmp,target=/var/tmp --name lightning-node ghcr.io/fleek-network/lightning:latest\nExecStop=/usr/bin/docker stop lightning-node\nStandardOutput=append:/var/log/lightning/output.log\nStandardError=append:/var/log/lightning/diagnostic.log\n\n[Install]\nWantedBy=multi-user.target\n"})}),"\n",(0,i.jsx)(n.p,{children:"Once the file is saved, change the file permissions by running the command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo chmod 644 /etc/systemd/system/docker-lightning.service\n"})}),"\n",(0,i.jsx)(n.p,{children:"Next, reload the Systemctl Daemon:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo systemctl daemon-reload\n"})}),"\n",(0,i.jsx)(n.p,{children:"Enable the service on startup when the system boots:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo systemctl enable docker-lightning.service\n"})}),"\n",(0,i.jsxs)(n.p,{children:["As a result, we are now able to run our containers as a Systemd service. For this, read the document ",(0,i.jsx)(n.a,{href:"/docs/node/systemd-service",children:"manage systemd service"})," to find more about how to control the service."]}),"\n",(0,i.jsx)(n.h2,{id:"viewing-logs",children:"Viewing logs"}),"\n",(0,i.jsx)(n.p,{children:"To view the logs of a Docker container in real time, use the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo docker logs -f lightning-node\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If you have wrapped the ",(0,i.jsx)(n.a,{href:"#run-the-docker-container-as-systemd-service",children:"docker container as a systemd service"}),", you can use the same commands found when installed natively, such as:"]}),"\n",(0,i.jsx)(n.p,{children:"For standard output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"tail -f /var/log/lightning/output.log\n"})}),"\n",(0,i.jsx)(n.p,{children:"Or, the standard error:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"tail -f /var/log/lightning/diagnostic.log\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Learn more about how to ",(0,i.jsx)(n.a,{href:"/docs/node/analyzing-logs",children:"analyze log messages"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(n.p,{children:"Containers are a way to have a self-contained environment that includes all necessary dependencies, libraries, software, amongst others required to run an application."}),"\n",(0,i.jsxs)(n.p,{children:["Fleek Network's Lightning is developed with ",(0,i.jsx)(n.a,{href:"https://www.rust-lang.org/",children:"Rust"}),", a general-purpose programming language, that requires several dependencies and libraries to compile the project. Some of these libraries are not installed by default and require some troubleshooting for the end user. ",(0,i.jsx)(n.a,{href:"https://www.docker.com/",children:"Docker"})," provides us with containers, self-containing all the required libraries for the purpose of running Lightning, our application."]}),"\n",(0,i.jsxs)(n.p,{children:["We guided you through the initial installation steps, and how to build a ",(0,i.jsx)(n.a,{href:"https://www.docker.com/",children:"Docker"})," image, which then's used to Docker run a container. Plus, provided lower-level commands, to help you understand other present or advanced use-cases, and also at higher level, offerring simple utility methods."]}),"\n",(0,i.jsxs)(n.p,{children:["While we do our best to provide the clearest instructions, there's always space for improvement, therefore feel free to make any contributions by messaging us on our ",(0,i.jsx)(n.a,{href:"https://discord.gg/fleek",children:"Discord"})," or by opening a ",(0,i.jsx)(n.a,{href:"https://github.com/fleek-network",children:"PR"})," in any of our repositories."]}),"\n",(0,i.jsxs)(n.p,{children:["Discover more about the project by ",(0,i.jsx)(n.a,{href:"https://github.com/fleek-network/lightning",children:"watching/contributing on Github"}),", following us on ",(0,i.jsx)(n.a,{href:"https://twitter.com/fleek_net",children:"Twitter"}),", and joining ",(0,i.jsx)(n.a,{href:"https://discord.gg/fleek",children:"our community Discord"})," for all the best updates!"]}),"\n",(0,i.jsx)(o.Z,{name:"Helder Oliveira",image:"https://github.com/heldrida.png",title:"Software Developer + DX",url:"https://github.com/heldrida"})]})}function p(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(g,{...e})}):g(e)}},8432:(e,n,t)=>{t.d(n,{ZP:()=>s});var i=t(5893),r=t(1151);function o(e){const n={admonition:"admonition",code:"code",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["We recommend creating a ",(0,i.jsx)(n.code,{children:"non-root"})," user with administrative privileges. It'll allow us to install any system requirements."]}),"\n",(0,i.jsxs)(n.p,{children:["You can create a new user and add to the ",(0,i.jsx)(n.strong,{children:"sudo"})," group by running:"]}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["For our example, we'll be using the name ",(0,i.jsx)(n.code,{children:"lgtn"})," but you can pick whichever you'd like. If you already have a ",(0,i.jsx)(n.strong,{children:"sudoer"})," account, you can skip this step."]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo adduser lgtn\n"})}),"\n",(0,i.jsxs)(n.p,{children:["After completing the ",(0,i.jsx)(n.code,{children:"adduser"})," steps, execute the ",(0,i.jsx)(n.code,{children:"usermod"})," to add the ",(0,i.jsx)(n.code,{children:"user"})," to the ",(0,i.jsx)(n.strong,{children:"sudo"})," group, as follows:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"sudo usermod -aG sudo lgtn\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Switch to the new ",(0,i.jsx)(n.strong,{children:"user"})," by using the command:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"su lgtn\n"})}),"\n",(0,i.jsx)(n.p,{children:"Change the directory to the new user's home, as follows:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"cd /home/lgtn\n"})})]})}function s(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},3183:(e,n,t)=>{t.d(n,{ZP:()=>s});var i=t(5893),r=t(1151);function o(e){const n={a:"a",admonition:"admonition",code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(n.admonition,{type:"tip",children:[(0,i.jsx)(n.p,{children:"You have several ways of doing this:"}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Clone via HTTPS"}),"\n",(0,i.jsx)(n.li,{children:"Clone via SSH"}),"\n",(0,i.jsx)(n.li,{children:"Download via Github CLI"}),"\n",(0,i.jsxs)(n.li,{children:["Download the ",(0,i.jsx)(n.a,{href:"https://github.com/fleek-network/lightning/archive/refs/heads/main.zip",children:"zip package"})," from the repository"]}),"\n"]}),(0,i.jsxs)(n.p,{children:["We recommend HTTPS because it is the easiest to set up in the wild, and by users who are new to all this.\nAlthough, we strongly recommend using an SSH connection when interacting with GitHub. If you are to this and are interested read more about it ",(0,i.jsx)(n.a,{href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh",children:"here"}),"."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"git clone -b testnet-alpha-1 https://github.com/fleek-network/lightning.git <DIRECTORY-NAME>\n"})}),(0,i.jsxs)(n.p,{children:["At time of writing, we are checking the branch name ",(0,i.jsx)(n.code,{children:"testnet-alpha-1"})," that corresponds to the testnet phase.\nHere's an example of what it'd look like when sticking to the recommended path location:"]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"git clone -b testnet-alpha-1 https://github.com/fleek-network/lightning.git ~/fleek-network/lightning\n"})})]})}function s(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},3872:(e,n,t)=>{t.d(n,{Z:()=>r});t(7294);var i=t(5893);const r=e=>{let{image:n,name:t,title:r,url:o,communityMember:s=!1}=e;return(0,i.jsx)("section",{className:"author_card",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"avatar",children:(0,i.jsx)("a",{href:o,target:"_blank",alt:t,children:(0,i.jsx)("img",{src:n,alt:t})})}),(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{className:"name",children:(0,i.jsx)("a",{href:o,target:"_blank",alt:t,children:t})}),(0,i.jsx)("span",{className:"title",children:r}),(0,i.jsxs)("span",{className:"discord",children:[s?"Join our community on":"Got questions? Find us on"," ",(0,i.jsx)("a",{href:"https://discord.gg/fleek",target:"_blank",children:"discord!"})]})]})]})})}},3451:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/running-a-node-in-docker-cc0a5b3fda558b4b6dd40022fe5dd09f.png"},8597:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/running-a-node-in-docker-cc0a5b3fda558b4b6dd40022fe5dd09f.png"},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var i=t(7294);const r={},o=i.createContext(r);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);