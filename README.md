This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



Ayuda adicional
https://datalab.medium.com/nextjs-14-json-api-with-mysql-9f635b5ecb1d
https://jasonwatmore.com/next-js-13-mysql-user-registration-and-login-tutorial-with-example-app
https://es.stackoverflow.com/questions/417088/insertar-datos-en-la-db-mysql


# Docker stuff
```
docker pull mysql
docker run --name mysql -e MYSQL_ROOT_PASSWORD=myadmin -it -p 3306:3306 -d mysql:latest
mysql -u root mysql -p <myadmin>
show databases;
create database sebas;
use sebas;

mysql -u root sebas -p <myadmin>
```

# Styles (UI, CSS)
https://tailwindui.com/components/preview
https://headlessui.com/react/menu
