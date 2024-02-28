This is the read me for the statement portal UI.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Important Info
The projects uses 
- ant design components
- module.css
- inline styles.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## General rules for pushing changes

Before pushing the changes to remote origin always ensure you branch has the latest changes from the master (always update your branch with latest changes)

- change to master
- pull the latest changes
- change to your branch
- rebase from master to bring the master changes to your branch

Any Task or feature being developed should always be done a new branch.

Always give good description when creating a pull request to describe which has been implemented or add. You can screen shot of you components

## Project Development steps

```
- 1. git checkout master  (change to master directory)
- 2. git pull origin master  (fetch all changes from remote)
- 3. git checkout -b [feature branch name]   (change to a new branch where u can do your changes).

```

## Request for Pull Request

```
- 1.    git add .   [add your changes awaiting commit]
- 2.    git commit -m 'your message'
- 3.    git checkout   master  (to change to master)
- 4.    git pull origin master  (fetch master changes)
- 5.    git checkout [your branch name]
- 6.    git rebase master  (brings in you changes from master if any. you might be required to solve conflict at these stage) if any changes you might be required to a commit again

 7.   git push origin  [branch name]

```



## FOLDER STRUCTURE

- public
- src

  - app [contains our app routes]

    - feature_name ( folder with module name(route) being implement)

      - page.tsx my page for a feature e.g [sign in]
      - layout.tsx for layouts
      - \_features holds any feature components or elements specific to the route or module,

        - ### Characteristis

          ```
          1. They are container components and can make request to external services

          2. They are capable of managing states

          3. They are specific to a module 
          ```

  - components. ( This are reusable components across the projects [contains our atom , molecule and widgets]). They take data as a prop among other props. they never make any external calls
    - atoms. single element components
    - molecules. components that have more than one component
    - widgets. card like components
  - services. [contains services ,this include all api calls pure typescript function and no react components]
  - types. [contains a defination/dictionary of types ]
  - utils. [supporting reusable functions pure type script]
## git branch naming

 - feature branch -- ft-[branch name]
 - bug branch   --  bug-[branch name]
 - test branch  --- test-[branch-name] 
 - Spike branch --  spike-[branch name]
 - documentation -- doc-[branch-name"]

## LINKS

https://ant.design/components/overview/

https://nextjs.org/docs/getting-started/project-structure

## Learn More

We s
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
