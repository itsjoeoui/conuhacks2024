Inspiration 💡
Our goal was trying to find something novel in the world of financial visualisations. Since the domain is old and has thus already been extensively explored we decided to focus mainly on novel ways in which the user can interact with the data.

What it does 🤔
National Stonk is a cutting-edge dashboard tool used to visualize 4 minutes straight of National Bank's stock market data. The core feature of this AI tool is the analytics feature, it enables the user to prompt a chatbot with questions such as "What are the outliers in the data?", "What is the most traded stock in the last 2 minutes?".

We believe that this analytical tool can fundamentally transform the way in which stock brokers interact with their data, it enables them to not only draw conclusions faster but also to dynamically interact with the data by performing operations such as filtering.

How we built it 💡
This application was built using the T3 stack, using technologies such as Next.js, Drizzle, tRPC, Tailwind, Typescript, and Zod. The frontend of the website was built using the shadcn UI library for styling, and Plotly.js was used for data visualization. The backend consisted of multiple components, most notably backend machine learning computations were done with the OpenAI API. Furthermore, the original market data that was presented in a .json file was transferred to a Postgres database to achieve faster query times.

Challenges we ran into ❗
Brainstorming for us was initially the biggest challenge. We started off the hackathon by brainstorming a project that was too complicated to achieve, and would have taken much longer than 24 hours to complete. After several hours we ended up finalizing our idea, and after taking time to go through all of the requirements, we were very satisfied with what we had come up with. A big part of the brainstorming process was coming up with various ways to visualize the data. In terms of the technical aspect, the main problem we had was optimizing our project to have real-time data visualization. There were over 200,000 rows within our postgres database that needed to be processed within 5 minutes, so finding a way to process this massive load of data was a challenge.

Accomplishments that we're proud of 🚀
We're very proud of our incorporation of machine learning into the project. Incorporating an entire AI chatbot into the application that could generate SQL queries on the fly was a big achievment for us. Furthermore, the fact that our project is multi-faceted in terms of visual appeal, functionality, and development is very important to us. We made sure that the data visualization for the project was quite extensive. We're proud of how we ended up solving the data ingestion problem, given that there was over 200,000 rows in the postgres database, and managed to create a real-time visualization. In addition, we added many statistics that the user could look at, and gave many options that the user could play around with.

What we learned 🤔
Since we all contributed to different parts of the project, we all learnt different things. For some of us, it was our first exposure to using AI, so using the OpenAI API was something that was learnt. A lot of us were also new to using the T3 stack, so we learnt new technologies like tRPC, Tailwind, Drizzle, and Postgres.

What's next for National Stonk 🫣
A lot of improvements can potentially be added to National Stonk. One thing we wanted to do but didn't have the time to add was to have the user be able to select a predictive ML model. This predictive ML model would be plotted with the real time graph, and the user could see the a line of the prediction next to the actual stock market value.

Another key improvement would be to allow the user to generate visualisations through the analytical tool.
