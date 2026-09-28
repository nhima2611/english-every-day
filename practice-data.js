// Short contextual examples for every vocabulary item in the course.
const vocabularyContexts = Object.fromEntries(`routine|My morning routine starts with a short walk.
alarm|I set an alarm for six in the morning.
commute|I commute to work by bus.
colleague|A colleague helped me finish the report.
adjust|It takes time to adjust to a new team.
habit|Reading before bed is a useful habit.
deadline|We must finish before the deadline.
progress|Regular practice helps me make progress.
obstacle|Lack of time is our biggest obstacle.
recover|I need a few days to recover from the flu.
contact|Please keep in contact with the team.
message|I left a message for my manager.
comfortable|I feel comfortable speaking with my team.
confident|Practice makes me more confident.
opportunity|This project is an opportunity to learn.
responsibility|Checking the report is my responsibility.
break|Let's take a short break after lunch.
note|I wrote a note to remember the address.
advantage|Experience gives our team an advantage.
role|Everyone has a role in this project.
part|I want to take part in the discussion.
trash|Please take out the trash tonight.
course|I am taking an English course.
hobby|Photography is my favorite hobby.
over|She will take over the project next week.
account|We take the cost into account.
time|We need more time to finish this task.
medicine|Take this medicine after your meal.
photo|We took a photo of the whole team.
effect|The change had a positive effect.
decision|We need to make a decision today.
mistake|I made a mistake in the report.
research|We need more research before choosing a tool.
effort|Learning a language takes effort.
change|A small change can improve the design.
choice|We have a choice between two options.
plan|We agreed on a plan for the release.
task|My first task is to check the logs.
exercise|This exercise helps me remember new words.
best|I always try to do my best.
promise|I made a promise to practice every day.
noise|The noise outside makes it hard to focus.
difference|Daily practice makes a difference.
business|She runs a small business.
process|The review process has three steps.
step|The next step is to test the app.
ahead|We can go ahead with the release.
back|Let's go back to the first question.
through|We went through the checklist together.
on|Let's go on with the next item.
approval|We need approval before the release.
checklist|Use this checklist before you deploy.
forward|We are moving forward with the plan.
live|The new website will go live tomorrow.
offline|You can read the saved document offline.
slowly|Please speak slowly so I can understand.
smoothly|The meeting went smoothly.
idea|She suggested an idea for the new page.
solution|We found a solution to the problem.
across|I came across a useful article yesterday.
up|A new question came up in the meeting.
out|The update came out last Friday.
along|The project is coming along well.
source|Please check the source of this information.
result|We are happy with the result.
simple|We chose a simple design.
unexpected|An unexpected error stopped the test.
together|We worked together to fix the issue.
available|The new version is available now.
clear|Your explanation was clear and helpful.
option|The cheaper option fits our budget.
feedback|My manager gave me useful feedback.
advice|I asked my teammate for advice.
hand|Could you give me a hand with this task?
away|Do not give away private details.
report|I sent the weekly report this morning.
detail|We checked every detail before the demo.
support|Thank you for your support during the project.
response|We are waiting for a response from the client.
example|Could you give me an example?
permission|You need permission to open this file.
notice|The team gave us notice before the change.
presentation|I prepared a presentation for the meeting.
track|We keep track of all open bugs.
touch|Let's keep in touch after the project.
mind|Keep the deadline in mind.
going|Keep going even when the task is difficult.
pace|You can learn at your own pace.
record|We keep a record of each release.
consistent|Small, consistent steps help me improve.
focus|I need a quiet room to focus.
status|Please update the status of your task.
calm|Stay calm when something goes wrong.
balance|I try to keep a balance between work and rest.
priority|Fixing the login issue is our top priority.
off|We put off the meeting until Monday.
into|We put the new process into practice.
practice|Daily practice helps me speak more clearly.
issue|We found an issue during testing.
meeting|The team meeting starts at nine.
device|Please test the page on another device.
resource|This guide is a useful resource for beginners.
memory|The server ran out of memory.
error|The form shows an error when the name is empty.
against|We ran up against a platform limit.
test|This test checks the login flow.
limit|There is a limit on the file size.
network|The office network is slow today.
failure|A network failure stopped the upload.
retry|Please retry the request in a few minutes.
capacity|The server has enough capacity for more users.
investigate|We need to investigate the cause of the error.
look|Please look at this example.
after|I look after the shared component.
documentation|The documentation explains how to use the API.
future|We should plan for future changes.
warning|The browser showed a warning about the file.
quality|We check the quality of every release.
career|Learning English can help my career.
down|We had to turn down the request.
around|The team turned the project around.
request|We received a request for a new feature.
feature|This feature lets users save their work.
approach|We tried a different approach to the problem.
trade-off|There is a trade-off between speed and cost.
root cause|We need to find the root cause of the bug.
cope|We must cope with the increase in traffic.
resolve|This patch should resolve the issue.
sort|Please sort the tasks by priority.
workaround|We found a temporary workaround for the issue.
impact|The change had little impact on performance.
constraint|Time is the main constraint on this project.
settle|We need to settle on one solution.
escalate|Please escalate the issue to your manager.
agenda|The first item on the agenda is the release.
clarify|Could you clarify the requirements?
interrupt|Sorry to interrupt, but I have a question.
opinion|What is your opinion on this design?
concern|She raised a concern about the deadline.
timeline|We agreed on a timeline for the project.
update|The latest update fixes the login issue.
explain|Please explain the process to the new teammate.
discuss|Let's discuss the two options.
present|I will present the idea to the team.
audience|Keep your audience in mind when you speak.
question|I have a question about the setup.
polite|It is important to be polite when giving feedback.
summary|Please send a short summary of the meeting.
collaborate|I collaborate with designers on this project.
goal|Our goal is to make the app easier to use.
independently|She can finish the task independently.
reliable|We need a reliable service for storing files.
maintain|We maintain the shared code together.
scope|This request is outside the project scope.
estimate|Can you give me an estimate of the cost?
dependency|This library is a dependency of our app.
review|The code is ready for review.
outcome|We are pleased with the outcome of the project.
consider|We should consider changing the design.
assumption|We need to check that assumption with real data.
evidence|The logs provide evidence of the problem.
consequence|A delay may be a consequence of this decision.
perspective|Try to see the issue from the user's perspective.
reasonable|That is a reasonable estimate.
decide|We must decide on an option today.
reflect|I reflect on what I learned each week.
predict|It is hard to predict the result.
alternative|We need an alternative if this plan fails.
recommend|I recommend this book to new learners.
uncertain|We are uncertain about the release date.`.split('\n').map(line => line.split('|')));
