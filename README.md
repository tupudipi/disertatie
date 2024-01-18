## What this is

As part of my Master's degree project, I developed an online decision support tool aimed at assisting high school graduates in choosing a bachelor's program. The website allows students to explore all available bachelor programs across faculties in Romanian universities. While this is a direct continuation of my Bachelor's degree project, this represents a significant evolution from my previous work, involving a complete top to bottom rewrite to modernize the application, and the addition of useful features like a questionnaire and an AI powered digital educational counsellor chat page. Migration from plain PHP to Next.js using the latest features in version 14 like the App Router and route handlers, and transitioning to PostgreSQL for Vercel hosting were key steps in achieving this.

## Key Features

- User-Friendly Exploration: The tool provides an easy-to-use interface for students to navigate and evaluate bachelor programs.
 - Smart Recommendation System: Through a 30-item questionnaire, users receive personalized recommendations for their ideal domain of study. The results are then visible to the digital counsellor.
 - Digital Educational Counselling: Users can engage in interactive chats with a digital educational counsellor for tailored insight, powered by artificial intelligence.

## Tech Stack
 - Next.js: The application is developed using Next.js for optimal performance and a modern user experience.
 - Data Management with PostgreSQL: The entire database was migrated to PostgreSQL to facilitate hosting on Vercel, ensuring a seamless online experience.
 - Firebase for Authentication: Secure user authentication is implemented through Firebase.
 - OpenAI API Integration: Intelligent conversations with the digital educational counsellor are enabled through the use of the OpenAI API.

## Feature Showcase
The website's user interface is completely responsive, displaying all information correctly on the page both on desktop and mobile devices. The user flow, in broad strokes, is the following:
### Home page
First, all features at the users' disposal are listed on the home page:

  ![home](https://github.com/tupudipi/disertatie/assets/57905839/11945416-4387-43cd-ae1c-83410deebe08)
   

### Questionnaire
Users, both logged in or not, can go through the questionnaire to receive personalised recommendations:
   
  ![chestionar ppt](https://github.com/tupudipi/disertatie/assets/57905839/cb64fab4-a9a2-4e70-9eab-ae167ce10fcd)


### Digital Educational Counsellor Chat
Users can chat with a digital educational counselor powered by AI through the usage of the OpenAI API. Currently this is set to use GPT 3.5 but can use any model accesible through the API. The LLM is instructed through its system message to act as a digital educational counselor and assist graduates with their inquiries. The counsellor has knowledge of the 6 educational domains and each of their branches, and is instructed to help users find a branch of study that is most suited to their interests and skills. If the user is logged in and has already went through the questionnaire, and received peronalised recommendations prior to chatting, the counsellor has acces to the user's results:
   
  ![consilier ppt](https://github.com/tupudipi/disertatie/assets/57905839/f92f8fee-f3be-4559-9765-dbd3b6030d86)


### 'Easy' Search
Users can search through all bachelor programs in two ways: either by starting from a domain of study, or from a region. This is to provide options for all users, whether they know the field they are passionate about and want to find out where they can study that particular field, or they know the region they want to go to and want to find out what study programs are available in that particular location:
   
  ![domenii open ppt](https://github.com/tupudipi/disertatie/assets/57905839/3891b2fc-37a0-4871-965c-4ec50d5923fe)
  ![regiuni open ppt](https://github.com/tupudipi/disertatie/assets/57905839/26138d92-3e74-444e-a0f2-b0e30090b262)


### Advanced Search
Users have acces to an advanced search page, where they can filter bachelor programs by all available criteria. Filters can be combined and they affect the displayed options without reloading the page.
   
  ![cautare avansata ppt](https://github.com/tupudipi/disertatie/assets/57905839/76e6880e-8b37-4544-adfd-e7647936da5a)


### Comment Section
Users can see what other people are saying about each bachelor program in the comment sections of the programs' pages. Only logged in users can leave comments. The messages are organised in a reddit-like thread structure of multiple levels of comments and replies:
   
  ![specializare logged in ppt](https://github.com/tupudipi/disertatie/assets/57905839/f33b74be-4d13-4470-aeec-0ff84fa0fe6b)
  ![comments ppt](https://github.com/tupudipi/disertatie/assets/57905839/5fafd3a1-7c5f-4d35-b9e0-feb35410a25d)



## Missing Features (coming soon®)
 - user profile page with previous questionnaire recommendations, comment history etc.
 - website admin interface
 - e-mail confirmation when registering
 - user password reset
