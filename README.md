This is a [Next.js](https://nextjs.org/) project supported on back with [Strapi](https://strapi.io/).

## Getting Started  
### Frontend:
NextJs framework

##### Select folder
```bash
cd ../facepalm
```

##### Install modules
```bash
npm install
# or
npm i
```

##### Build project
```bash 
npm run build
```

##### Start project
```bash
npm run start
# on in dev version (no need to build)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

### Backend:
Strapi application programming interface

##### Install strapi
```bash 
npx create-strapi-app@latest facepalm
# quick start
```

##### Import backup
```bash
npm run strapi import -- -f file_name -k encryption_key
```

##### Run strapi
```bash
npm run start
# or in dev version
npm run develop
```

Open [http://localhost:1337](http://localhost:1337) with your browser to see the result.

To learn more about strapi, take a look at the following resources:
- [Strapi Documentation](https://docs.strapi.io/) - learn how Strapi works.
- [Strapi Intro](https://docs.strapi.io/user-docs/intro) - strapi tutorial.