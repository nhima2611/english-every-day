// One focused grammar pattern and one new bilingual example for every lesson day.
const grammarTopics = [
    {
        title: 'Hiện tại đơn', rule: 'Dùng cho thói quen và sự thật. Với he / she / it, động từ thường thêm -s hoặc -es.',
        formula: 'S + V(s/es) + ...', examples: [
            ['I check my notes every morning.', 'Tôi xem lại ghi chú mỗi sáng.', 'check'],
            ['She reads English stories at night.', 'Cô ấy đọc truyện tiếng Anh vào buổi tối.', 'reads'],
            ['We practice together on Fridays.', 'Chúng tôi luyện tập cùng nhau vào thứ Sáu.', 'practice'],
            ['He watches short videos after work.', 'Anh ấy xem video ngắn sau giờ làm.', 'watches'],
            ['They speak English in class.', 'Họ nói tiếng Anh trong lớp.', 'speak'],
            ['My friend writes a journal every day.', 'Bạn tôi viết nhật ký mỗi ngày.', 'writes'],
            ['The library opens at eight.', 'Thư viện mở cửa lúc tám giờ.', 'opens']
        ]
    },
    {
        title: 'Hiện tại tiếp diễn', rule: 'Dùng cho việc đang diễn ra ngay lúc nói. Thêm am / is / are trước động từ -ing.',
        formula: 'S + am/is/are + V-ing + ...', examples: [
            ['I am reviewing a new phrase now.', 'Tôi đang ôn một cụm từ mới lúc này.', 'am reviewing'],
            ['She is listening to a podcast.', 'Cô ấy đang nghe một chương trình âm thanh.', 'is listening'],
            ['We are preparing for a meeting.', 'Chúng tôi đang chuẩn bị cho một cuộc họp.', 'are preparing'],
            ['He is looking for his notebook.', 'Anh ấy đang tìm cuốn sổ của mình.', 'is looking'],
            ['They are discussing the answer.', 'Họ đang thảo luận về câu trả lời.', 'are discussing'],
            ['I am learning a useful expression.', 'Tôi đang học một cách diễn đạt hữu ích.', 'am learning'],
            ['The teacher is explaining the rule.', 'Giáo viên đang giải thích quy tắc.', 'is explaining']
        ]
    },
    {
        title: 'Quá khứ đơn', rule: 'Dùng cho hành động đã kết thúc trong quá khứ; động từ thường thêm -ed, động từ bất quy tắc có dạng riêng.',
        formula: 'S + V2 / V-ed + ...', examples: [
            ['I visited the museum yesterday.', 'Hôm qua tôi đã thăm bảo tàng.', 'visited'],
            ['She wrote three sentences last night.', 'Tối qua cô ấy đã viết ba câu.', 'wrote'],
            ['We practiced pronunciation on Monday.', 'Chúng tôi đã luyện phát âm vào thứ Hai.', 'practiced'],
            ['He bought a new dictionary.', 'Anh ấy đã mua một cuốn từ điển mới.', 'bought'],
            ['They arrived early this morning.', 'Sáng nay họ đã đến sớm.', 'arrived'],
            ['I found the answer in the book.', 'Tôi đã tìm thấy câu trả lời trong sách.', 'found'],
            ['The lesson ended at six.', 'Bài học đã kết thúc lúc sáu giờ.', 'ended']
        ]
    },
    {
        title: 'Tương lai với will', rule: 'Dùng will cho quyết định ngay lúc nói, lời hứa hoặc dự đoán.',
        formula: 'S + will + V nguyên mẫu + ...', examples: [
            ['I will call you after class.', 'Tôi sẽ gọi bạn sau giờ học.', 'will call'],
            ['She will send the file tonight.', 'Cô ấy sẽ gửi tệp tối nay.', 'will send'],
            ['We will review these words tomorrow.', 'Chúng tôi sẽ ôn những từ này vào ngày mai.', 'will review'],
            ['He will help us with the exercise.', 'Anh ấy sẽ giúp chúng tôi làm bài tập.', 'will help'],
            ['They will meet at the station.', 'Họ sẽ gặp nhau ở nhà ga.', 'will meet'],
            ['I will try a different approach.', 'Tôi sẽ thử một cách khác.', 'will try'],
            ['The weather will improve soon.', 'Thời tiết sẽ sớm tốt hơn.', 'will improve']
        ]
    },
    {
        title: 'Hiện tại hoàn thành', rule: 'Dùng cho trải nghiệm hoặc kết quả quá khứ còn liên quan đến hiện tại. Dùng have / has với quá khứ phân từ.',
        formula: 'S + have/has + V3 + ...', examples: [
            ['I have finished my homework.', 'Tôi đã làm xong bài tập về nhà.', 'have finished'],
            ['She has learned five new words.', 'Cô ấy đã học được năm từ mới.', 'has learned'],
            ['We have visited that city before.', 'Chúng tôi đã từng đến thành phố đó.', 'have visited'],
            ['He has lost his notebook.', 'Anh ấy đã làm mất cuốn sổ của mình.', 'has lost'],
            ['They have already eaten lunch.', 'Họ đã ăn trưa rồi.', 'have already eaten'],
            ['I have never tried this exercise.', 'Tôi chưa từng thử bài tập này.', 'have never tried'],
            ['The train has just arrived.', 'Tàu vừa mới đến.', 'has just arrived']
        ]
    },
    {
        title: 'Bị động ở hiện tại', rule: 'Dùng khi muốn nhấn mạnh người hoặc vật chịu tác động; người thực hiện có thể không cần nêu.',
        formula: 'S + am/is/are + V3 (+ by ...)', examples: [
            ['The room is cleaned every morning.', 'Căn phòng được dọn mỗi sáng.', 'is cleaned'],
            ['These emails are checked daily.', 'Những email này được kiểm tra hằng ngày.', 'are checked'],
            ['English is spoken in many countries.', 'Tiếng Anh được nói ở nhiều quốc gia.', 'is spoken'],
            ['The report is reviewed by the manager.', 'Báo cáo được người quản lý xem xét.', 'is reviewed'],
            ['The windows are opened at nine.', 'Các cửa sổ được mở lúc chín giờ.', 'are opened'],
            ['Fresh bread is sold here.', 'Bánh mì mới được bán ở đây.', 'is sold'],
            ['The results are shared with the team.', 'Kết quả được chia sẻ với cả nhóm.', 'are shared']
        ]
    },
    {
        title: 'Bị động ở quá khứ', rule: 'Dùng was / were + quá khứ phân từ khi sự việc bị tác động đã xảy ra trong quá khứ.',
        formula: 'S + was/were + V3 (+ by ...)', examples: [
            ['The letter was sent yesterday.', 'Lá thư đã được gửi hôm qua.', 'was sent'],
            ['The chairs were moved after class.', 'Những chiếc ghế đã được chuyển đi sau giờ học.', 'were moved'],
            ['The bridge was built in 1990.', 'Cây cầu được xây vào năm 1990.', 'was built'],
            ['The questions were answered clearly.', 'Các câu hỏi đã được trả lời rõ ràng.', 'were answered'],
            ['My bag was found at the station.', 'Túi của tôi đã được tìm thấy ở nhà ga.', 'was found'],
            ['The documents were signed on Monday.', 'Các tài liệu đã được ký vào thứ Hai.', 'were signed'],
            ['The meeting was canceled last week.', 'Cuộc họp đã bị hủy tuần trước.', 'was canceled']
        ]
    },
    {
        title: 'Động từ khuyết thiếu', rule: 'Sau can, should, must luôn dùng động từ nguyên mẫu không có to.',
        formula: 'S + can/should/must + V nguyên mẫu + ...', examples: [
            ['You can ask me a question.', 'Bạn có thể hỏi tôi một câu.', 'can ask'],
            ['We should review the lesson tonight.', 'Chúng ta nên ôn bài tối nay.', 'should review'],
            ['You must wear a seat belt.', 'Bạn phải thắt dây an toàn.', 'must wear'],
            ['She can explain the answer.', 'Cô ấy có thể giải thích câu trả lời.', 'can explain'],
            ['They should leave before six.', 'Họ nên rời đi trước sáu giờ.', 'should leave'],
            ['I must finish this task today.', 'Tôi phải hoàn thành việc này hôm nay.', 'must finish'],
            ['He can speak two languages.', 'Anh ấy có thể nói hai ngôn ngữ.', 'can speak']
        ]
    },
    {
        title: 'Câu điều kiện loại 1', rule: 'Nói về điều có thể xảy ra trong tương lai. Mệnh đề if dùng hiện tại đơn, mệnh đề chính thường dùng will.',
        formula: 'If + hiện tại đơn, S + will + V', examples: [
            ['If it rains, I will stay home.', 'Nếu trời mưa, tôi sẽ ở nhà.', 'will stay'],
            ['If you practice, you will improve.', 'Nếu bạn luyện tập, bạn sẽ tiến bộ.', 'will improve'],
            ['If she calls, I will answer.', 'Nếu cô ấy gọi, tôi sẽ trả lời.', 'will answer'],
            ['If we leave now, we will arrive early.', 'Nếu đi bây giờ, chúng ta sẽ đến sớm.', 'will arrive'],
            ['If he studies, he will pass the test.', 'Nếu học bài, anh ấy sẽ vượt qua bài kiểm tra.', 'will pass'],
            ['If they agree, we will start tomorrow.', 'Nếu họ đồng ý, chúng ta sẽ bắt đầu ngày mai.', 'will start'],
            ['If I have time, I will read more.', 'Nếu có thời gian, tôi sẽ đọc thêm.', 'will read']
        ]
    },
    {
        title: 'Câu điều kiện loại 2', rule: 'Nói về tình huống giả định ở hiện tại. Sau if dùng quá khứ đơn; mệnh đề chính dùng would + động từ.',
        formula: 'If + quá khứ đơn, S + would + V', examples: [
            ['If I had more time, I would travel.', 'Nếu có nhiều thời gian hơn, tôi sẽ đi du lịch.', 'would travel'],
            ['If she knew the answer, she would tell us.', 'Nếu biết đáp án, cô ấy sẽ nói cho chúng ta.', 'would tell'],
            ['If we lived nearby, we would meet often.', 'Nếu sống gần nhau, chúng ta sẽ gặp nhau thường xuyên.', 'would meet'],
            ['If he had a map, he would find the place.', 'Nếu có bản đồ, anh ấy sẽ tìm được nơi đó.', 'would find'],
            ['If they practiced more, they would improve.', 'Nếu luyện tập nhiều hơn, họ sẽ tiến bộ.', 'would improve'],
            ['If I were you, I would ask for help.', 'Nếu là bạn, tôi sẽ nhờ giúp đỡ.', 'would ask'],
            ['If it were warmer, we would go outside.', 'Nếu trời ấm hơn, chúng ta sẽ ra ngoài.', 'would go']
        ]
    },
    {
        title: 'So sánh hơn', rule: 'Tính từ ngắn thường thêm -er; tính từ dài thường dùng more. Đi với than để so sánh hai đối tượng.',
        formula: 'S + be + adjective-er / more adjective + than ...', examples: [
            ['This book is shorter than that one.', 'Cuốn sách này ngắn hơn cuốn kia.', 'shorter'],
            ['Today is warmer than yesterday.', 'Hôm nay ấm hơn hôm qua.', 'warmer'],
            ['This exercise is more useful than the last one.', 'Bài tập này hữu ích hơn bài trước.', 'more useful'],
            ['My bag is lighter than yours.', 'Túi của tôi nhẹ hơn túi của bạn.', 'lighter'],
            ['This route is safer than the old route.', 'Tuyến đường này an toàn hơn tuyến cũ.', 'safer'],
            ['The second story is more interesting than the first.', 'Câu chuyện thứ hai thú vị hơn câu chuyện đầu.', 'more interesting'],
            ['Her voice is clearer than mine.', 'Giọng cô ấy rõ hơn giọng tôi.', 'clearer']
        ]
    },
    {
        title: 'Mệnh đề quan hệ', rule: 'Dùng who để bổ nghĩa cho người; dùng which hoặc that để bổ nghĩa cho vật.',
        formula: 'Danh từ + who/which/that + mệnh đề', examples: [
            ['The woman who teaches us is kind.', 'Người phụ nữ dạy chúng tôi rất tốt bụng.', 'who'],
            ['The book that I borrowed is helpful.', 'Cuốn sách tôi mượn rất hữu ích.', 'that'],
            ['The app which tracks my progress is simple.', 'Ứng dụng theo dõi tiến độ của tôi rất đơn giản.', 'which'],
            ['The man who called yesterday is my teacher.', 'Người đàn ông gọi hôm qua là thầy của tôi.', 'who'],
            ['The song that we heard was beautiful.', 'Bài hát chúng tôi nghe rất hay.', 'that'],
            ['The table which stands by the door is new.', 'Chiếc bàn đặt cạnh cửa là bàn mới.', 'which'],
            ['The student who asked the question was right.', 'Học sinh đặt câu hỏi đã đúng.', 'who']
        ]
    },
    {
        title: 'To-infinitive và V-ing', rule: 'Một số động từ đi với to + V (want, decide, plan); một số đi với V-ing (enjoy, avoid, finish).',
        formula: 'want/decide/plan + to V · enjoy/avoid/finish + V-ing', examples: [
            ['I want to learn another phrase.', 'Tôi muốn học thêm một cụm từ.', 'to learn'],
            ['She enjoys reading short stories.', 'Cô ấy thích đọc truyện ngắn.', 'reading'],
            ['We plan to study together.', 'Chúng tôi dự định học cùng nhau.', 'to study'],
            ['He finished writing the report.', 'Anh ấy đã viết xong báo cáo.', 'writing'],
            ['They decided to leave early.', 'Họ quyết định rời đi sớm.', 'to leave'],
            ['I avoid using unfamiliar words.', 'Tôi tránh dùng từ chưa quen.', 'using'],
            ['She hopes to visit London.', 'Cô ấy hy vọng được thăm London.', 'to visit']
        ]
    },
    {
        title: 'Câu tường thuật', rule: 'Khi thuật lại lời nói trong quá khứ, thì trong lời nói thường lùi một bậc; said that dùng để mở đầu.',
        formula: 'S + said (that) + S + V lùi thì', examples: [
            ['He said that he was tired.', 'Anh ấy nói rằng mình mệt.', 'was'],
            ['She said that she liked the book.', 'Cô ấy nói rằng cô ấy thích cuốn sách.', 'liked'],
            ['They said that they were ready.', 'Họ nói rằng họ đã sẵn sàng.', 'were'],
            ['I said that I needed more time.', 'Tôi nói rằng mình cần thêm thời gian.', 'needed'],
            ['He said that he could help.', 'Anh ấy nói rằng mình có thể giúp.', 'could'],
            ['She said that she had finished.', 'Cô ấy nói rằng cô ấy đã hoàn thành.', 'had finished'],
            ['We said that we would return.', 'Chúng tôi nói rằng chúng tôi sẽ quay lại.', 'would return']
        ]
    },
    {
        title: 'Câu hỏi với từ để hỏi', rule: 'Đặt từ để hỏi ở đầu câu; với động từ thường, dùng do / does / did trước chủ ngữ.',
        formula: 'Wh-word + do/does/did + S + V?', examples: [
            ['Where do you study English?', 'Bạn học tiếng Anh ở đâu?', 'do'],
            ['What does she read every day?', 'Cô ấy đọc gì mỗi ngày?', 'does'],
            ['When did they arrive?', 'Họ đã đến khi nào?', 'did'],
            ['Why do we need this rule?', 'Tại sao chúng ta cần quy tắc này?', 'do'],
            ['How does he practice speaking?', 'Anh ấy luyện nói bằng cách nào?', 'does'],
            ['Which book did you choose?', 'Bạn đã chọn cuốn sách nào?', 'did'],
            ['Where do they meet on Fridays?', 'Họ gặp nhau ở đâu vào thứ Sáu?', 'do']
        ]
    }
];

function grammarForDay(day) {
    const topic = grammarTopics[Math.floor(day / 7)];
    const [example, translation, answer] = topic.examples[day % 7];
    return { title: topic.title, rule: topic.rule, formula: topic.formula, example, translation, answer };
}

function grammarQuestion(day) {
    const grammar = grammarForDay(day);
    return {
        id: `${day}-grammar`, sourceDay: day, type: 'blank',
        prompt: `${blankWord(grammar.example, grammar.answer)}\nGợi ý: ${grammar.title} · ${grammar.formula}`,
        answer: grammar.answer,
        explanation: `${grammar.example} · ${grammar.translation} ${grammar.rule}`,
        item: `grammar-${day}`
    };
}
