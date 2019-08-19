<h1>Baby Party Guide (BabyGuide) Rails and JavaScript app</h1>
<br>
<h2>The original app has been modified to include Javascript</h2>
<br>
This Baby Guide app allows a user to create checklists for baby birthday party needs and to add requests that need to be completed. The requests can be assigned to other users who wish to help. Users can view each-other's checklists and requests.

<h3>Instructions:</h3> This repository : git@github.com/ChristinaXT/BabyGuide_JS.git

1. Fork this repository & clone into it from your terminal
2. CD into the application
3. Make sure to run 'bundle install' to install all required gem dependencies
4. Run 'rake db:migrate'
5. Run rails s
6. Locally, you can visit: https://localhost:3000

First you will create an account or login if you already have one. You can create account through Facebook if you like.

You will be directed to the requests page, which will have a list of requests and say whether they have been taken or not.
-----------------------------------------------------------------------------------------------
Project Requirements ---
In this assessment you are going to expand upon your previous Rails project assessment. The goal is to add dynamic features to your previous Rails application that are possible only through JavaScript and a JSON API.

Do not use remote: true in this application.

1) Must translate JSON responses from your Rails app into JavaScript Model Objects using either ES6 class or constructor syntax. The Model Objects must have at least one method on the prototype. (Formatters work really well for this.)

2) Must render at least one index page (index resource - 'list of things') via JavaScript and an Active Model Serialization JSON Backend.

3) Must render at least one show page (show resource - 'one specific thing') via JavaScript and an Active Model Serialization JSON Backend.

4) Your Rails application must dynamically render on the page at least one serialized 'has_many' relationship through JSON using JavaScript.

5) Must use your Rails application to render a form for creating a resource that is submitted dynamically and displayed through JavaScript and JSON without a page refresh.


<h3>#License:</h3>


<h2>MIT License</h2>

Copyright (c) 2019 Christina

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
