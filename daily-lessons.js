// Daily readings use the day's sentence and speaking question, with a bilingual narrative.
const readingFrames = [
    [
        "This morning, I set aside a few quiet minutes to think about my habits. I want to explain an ordinary part of my day in clear English. Here is the sentence I choose to practice:",
        "Sáng nay, tôi dành vài phút yên tĩnh để suy nghĩ về các thói quen của mình. Tôi muốn diễn tả một phần bình thường trong ngày bằng tiếng Anh rõ ràng. Đây là câu tôi chọn để luyện tập:",
        "I say it slowly, then imagine a friend asking me for more information. I add one detail about my own experience and listen to the sentence again. Before I finish, I write a small reminder in my notebook:",
        "Tôi nói chậm, rồi tưởng tượng một người bạn hỏi thêm thông tin. Tôi thêm một chi tiết từ trải nghiệm của mình và nghe lại câu đó. Trước khi kết thúc, tôi viết một lời nhắc ngắn vào sổ:",
        "Now I am ready to answer a question without reading my notes:", "Bây giờ tôi sẵn sàng trả lời một câu hỏi mà không nhìn ghi chú:"
    ],
    [
        "At the beginning of the day, my teammate and I have a short conversation. We each share something about our plans, and I try to use the expression I have just learned. I start with this example:",
        "Đầu ngày, tôi và đồng đội trò chuyện ngắn. Mỗi người chia sẻ một điều về kế hoạch của mình, và tôi thử dùng cách diễn đạt vừa học. Tôi bắt đầu với ví dụ này:",
        "My teammate asks me to explain a little more. I pause, choose familiar words, and give a simple answer. I do not need a perfect sentence to make my meaning clear. After the conversation, I keep this thought in mind:",
        "Đồng đội đề nghị tôi giải thích thêm một chút. Tôi dừng lại, chọn những từ quen thuộc và trả lời đơn giản. Tôi không cần một câu hoàn hảo để truyền đạt rõ ý. Sau cuộc trò chuyện, tôi ghi nhớ điều này:",
        "To prepare for our next conversation, I practice answering this question:", "Để chuẩn bị cho lần trò chuyện tiếp theo, tôi tập trả lời câu hỏi này:"
    ],
    [
        "During a short break, I open my notebook and review a useful English expression. Instead of learning the words separately, I picture a real situation where I might need the whole phrase. My example for today is:",
        "Trong giờ nghỉ ngắn, tôi mở sổ và xem lại một cách diễn đạt tiếng Anh hữu ích. Thay vì học từng từ riêng lẻ, tôi hình dung một tình huống thực tế cần dùng cả cụm. Ví dụ hôm nay của tôi là:",
        "I read the example aloud and change one detail to make it personal. Then I cover the page and try to say it from memory. When I forget a word, I check it and try once more. This sentence gives me something else to think about:",
        "Tôi đọc to ví dụ và thay một chi tiết để câu phù hợp với bản thân. Sau đó tôi che trang giấy và thử nói lại từ trí nhớ. Khi quên một từ, tôi kiểm tra rồi thử lần nữa. Câu này cho tôi thêm một điều để suy nghĩ:",
        "I end my break with one short speaking task:", "Tôi kết thúc giờ nghỉ bằng một bài luyện nói ngắn:"
    ],
    [
        "Today, I want to explain an experience to someone who does not know the background. I need to keep my message simple, so I decide to begin with one clear sentence rather than a long explanation. I write:",
        "Hôm nay, tôi muốn kể một trải nghiệm cho người chưa biết bối cảnh. Tôi cần giữ thông điệp đơn giản, nên quyết định bắt đầu bằng một câu rõ ràng thay vì giải thích dài dòng. Tôi viết:",
        "Next, I add the reason and describe what happened afterward. Reading the message aloud helps me notice where I hesitate. I repeat that part a few times, then read the whole message at a comfortable speed. I also learn this useful idea:",
        "Tiếp theo, tôi thêm lý do và mô tả điều xảy ra sau đó. Đọc to tin nhắn giúp tôi nhận ra chỗ mình còn ngập ngừng. Tôi lặp lại phần đó vài lần rồi đọc cả tin nhắn với tốc độ thoải mái. Tôi cũng học thêm ý hữu ích này:",
        "If someone wants to know more, I can use this question to continue:", "Nếu ai đó muốn biết thêm, tôi có thể dùng câu hỏi này để tiếp tục:"
    ],
    [
        "Near the end of the day, I think about a situation that I could describe more clearly. I choose one expression from today's lesson and check how it fits into a complete sentence. This is the example I work with:",
        "Gần cuối ngày, tôi nghĩ về một tình huống mà mình có thể diễn tả rõ hơn. Tôi chọn một cách diễn đạt trong bài hôm nay và xem cách dùng nó trong một câu hoàn chỉnh. Đây là ví dụ tôi luyện tập:",
        "I imagine saying it in a conversation, then add a second sentence with a helpful detail. The two sentences sound more natural when I connect them with a short pause. I listen again and pay attention to the words I find difficult. My extra sentence is:",
        "Tôi tưởng tượng nói câu đó trong cuộc trò chuyện, rồi thêm câu thứ hai với một chi tiết hữu ích. Hai câu nghe tự nhiên hơn khi tôi nối chúng bằng một khoảng dừng ngắn. Tôi nghe lại và chú ý những từ còn khó. Câu bổ sung của tôi là:",
        "To check that I understand the expression, I answer:", "Để kiểm tra mình đã hiểu cách diễn đạt, tôi trả lời:"
    ],
    [
        "I have a little extra time today, so I practice telling a short story in English. First, I choose a familiar situation. Then I use a sentence from the lesson as the starting point for my story:",
        "Hôm nay tôi có thêm chút thời gian nên tập kể một câu chuyện ngắn bằng tiếng Anh. Đầu tiên, tôi chọn một tình huống quen thuộc. Sau đó tôi dùng một câu trong bài làm điểm bắt đầu cho câu chuyện:",
        "I explain who was there and why the situation mattered. If I cannot remember a word, I use a simpler one and keep speaking. Afterward, I listen to the example again and improve one part of my story. I finish with a useful thought:",
        "Tôi giải thích ai đã có mặt và vì sao tình huống đó quan trọng. Nếu không nhớ một từ, tôi dùng từ đơn giản hơn và tiếp tục nói. Sau đó tôi nghe lại ví dụ và cải thiện một phần câu chuyện. Tôi kết thúc bằng một suy nghĩ hữu ích:",
        "This question helps me make the story about my own experience:", "Câu hỏi này giúp tôi gắn câu chuyện với trải nghiệm của mình:"
    ],
    [
        "After several days of practice, I look back at the English I have learned. Some expressions are easy to remember, while others still need more attention. I choose today's example and read it without rushing:",
        "Sau vài ngày luyện tập, tôi nhìn lại phần tiếng Anh đã học. Có những cách diễn đạt dễ nhớ, còn một số vẫn cần chú ý thêm. Tôi chọn ví dụ hôm nay và đọc thong thả:",
        "Then I close my notebook and explain the meaning in my own words. I think of a situation where I could use it in the coming days. Writing down that situation gives my practice a clear purpose. Before moving on, I repeat this reminder:",
        "Sau đó tôi đóng sổ và giải thích ý nghĩa bằng lời của mình. Tôi nghĩ đến một tình huống có thể dùng nó trong những ngày tới. Viết tình huống ấy ra giúp việc luyện tập có mục đích rõ ràng. Trước khi chuyển sang phần khác, tôi nhắc lại:",
        "Finally, I challenge myself to answer in two or three sentences:", "Cuối cùng, tôi thử thách bản thân trả lời bằng hai hoặc ba câu:"
    ]
];
function lessonVocabulary(day) {
    const d = days[day];
    return Array.from({ length: 5 }, (_, j) => d.unit.words[(d.di * 2 + j) % d.unit.words.length].split('=').map(s => s.trim()));
}
function lessonReading(day) {
    const d = days[day], frame = readingFrames[d.di], extra = readingExtras[d.week];
    return {
        english: `${frame[0]} “${d.sentence}” ${frame[2]} “${extra[2]}” ${frame[4]} “${d.prompt}”`,
        vietnamese: `${frame[1]} “${translations[d.week][d.di]}” ${frame[3]} “${extra[3]}” ${frame[5]} ${speakingTranslations[d.week][d.di]}`
    };
}
const speakingTranslations = [
['Bạn thức dậy lúc mấy giờ?','Bạn chuẩn bị đi làm như thế nào?','Bạn đến chỗ làm bằng cách nào?','Bạn hòa thuận với ai ở chỗ làm?','Bạn đã vượt qua thử thách nào?','Hôm nay bạn sẽ quay lại nhiệm vụ nào?','Bạn đang dần quen với điều gì?'],
['Bạn muốn bắt đầu sở thích nào?','Bạn mang thứ gì ra ngoài khi làm việc nhà?','Bạn tham gia những cuộc họp nào?','Bạn phụ trách nhiệm vụ nào?','Bạn có nhận thêm nhiệm vụ không?','Bạn đã từng tiếp quản dự án chưa?','Bạn nên tính đến điều gì trước khi phát hành?'],
['Bạn đưa ra quyết định ở chỗ làm như thế nào?','Bạn đang tiến bộ như thế nào trong việc học tiếng Anh?','Bạn luôn đảm bảo kiểm tra điều gì trước khi phát hành?','Một nhóm có thể bù lại sự chậm trễ như thế nào?','Bạn cần nghiên cứu về điều gì?','Bạn sẽ cố hết sức thế nào khi gặp nhiệm vụ khó?','Bạn có thể tạm không cần tính năng nào?'],
['Bạn nên xem lại những yêu cầu nào?','Bạn xem kỹ những gì khi gỡ lỗi?','Khi nào nhóm có thể tiến hành phát hành?','Khi nào bạn quay lại thiết kế trước đó?','Bạn tiếp tục cuộc họp như thế nào?','Khi nào tính năng tiếp theo của bạn sẽ ra mắt?','Điều gì giúp việc triển khai diễn ra suôn sẻ?'],
['Bạn nghĩ ra giải pháp như thế nào?','Gần đây bạn có tình cờ thấy công cụ hữu ích nào không?','Bạn nên quay lại câu hỏi nào sau?','Quyết định này chủ yếu phụ thuộc vào điều gì?','Gần đây có bản cập nhật nào được phát hành?','Dự án của bạn đang tiến triển thế nào?','Một nhóm có thể chung sức giải quyết vấn đề như thế nào?'],
['Kiểu góp ý nào giúp bạn tiến bộ?','Khi nào bạn nhờ đồng đội giúp một tay?','Điều gì giúp bạn không bỏ cuộc?','Bạn đã trả lại thứ gì cho ai?','Hệ thống đưa ra thông báo lỗi nào?','Buổi demo không nên tiết lộ thông tin nào?','Điều gì có thể dẫn đến lỗi?'],
['Bạn theo kịp công nghệ mới như thế nào?','Bạn tiếp tục luyện kỹ năng nào?','Nhóm của bạn theo dõi nhiệm vụ như thế nào?','Nhóm của bạn nên ghi nhớ điều gì?','Bạn giữ liên lạc với ai?','Bạn giữ dữ liệu kiểm thử tách khỏi môi trường thực tế như thế nào?','Khi nào bạn đã phải tiếp tục cố gắng?'],
['Bạn sẽ hoãn cuộc họp nào nếu cần?','Bạn cần chuẩn bị những gì cho buổi demo?','Bạn sẽ đề xuất ý tưởng nào?','Nhóm của bạn nên áp dụng cách làm mới nào?','Bạn nên cất thiết bị dùng chung ở đâu?','Khi nào nhóm nên phát hành bản sửa lỗi khẩn cấp?','Người dùng không nên phải chịu đựng điều gì?'],
['Gần đây bạn gặp vấn đề gì?','Máy chủ có thể hết loại tài nguyên nào?','Bạn nên chạy thử luồng nào trước khi phát hành?','Bạn xin ý kiến ai về một ý tưởng mới?','Ứng dụng của bạn chạy trên nền tảng nào?','Nhóm của bạn từng gặp những giới hạn nào?','Bạn nên xem lại những gì trước buổi demo?'],
['Nhóm của bạn đang điều tra vấn đề nào?','Bạn phụ trách mã nguồn dùng chung nào?','Bạn tìm nguyên nhân lỗi như thế nào?','Bạn tra cứu những gì trong tài liệu?','Bạn đang mong chờ điều gì?','Bạn nên chú ý trường hợp biên nào?','Bạn thường nhìn lại dự án nào trước đây?'],
['Khi nào bạn có thể từ chối một yêu cầu?','Hãy kể về một cách sửa hóa ra lại đơn giản.','Một nhiệm vụ nhỏ từng trở thành dự án lớn chưa?','Bạn tìm đến ai để xin lời khuyên?','Khi nào bạn bật nhật ký gỡ lỗi?','Bạn có thể tắt cờ tính năng cũ nào?','Một nhóm có thể xoay chuyển đợt phát hành chậm trễ như thế nào?'],
['Bạn xử lý lỗi khẩn cấp như thế nào?','Một nhóm có thể ứng phó với lượng truy cập tăng đột biến như thế nào?','Bạn nên giải quyết vấn đề nào trước?','Bạn lần lượt xử lý các ca kiểm thử lỗi như thế nào?','Nhóm của bạn đã chốt cách tiếp cận như thế nào?','Bạn đã gặp phải giới hạn nào?','Thay đổi nào đã giải quyết một vấn đề?'],
['Nhóm của bạn nên trao đổi điều gì trước khi phát hành?','Bạn nói chuyện với ai về các câu hỏi thiết kế?','Bạn nên thảo luận kỹ những phương án nào?','Bạn có thể hướng dẫn ai đó từng bước quy trình nào?','Khi nào một đồng đội nên lên tiếng?','Bạn sẽ nêu mối lo nào trong cuộc họp?','Bạn truyền đạt rõ một ý kỹ thuật như thế nào?'],
['Bạn đang làm tính năng nào?','Bạn làm việc gần gũi nhất với ai?','Bạn đã tìm ra giải pháp như thế nào?','Nhóm của bạn đang hướng tới mục tiêu nào?','Bạn đã khắc phục giới hạn nào?','Bạn lần lượt xử lý nhận xét rà soát như thế nào?','Thiết kế nào phù hợp với màn hình điện thoại?'],
['Bạn đang nghĩ đến việc thay đổi điều gì?','Bạn có nghĩ ra một ví dụ hữu ích không?','Bạn nên cân nhắc kỹ đề xuất nào?','Nhóm nên suy xét kỹ những trường hợp biên nào?','Nhóm của bạn có thể tính trước việc bảo trì như thế nào?','Bạn nhớ lại điều gì khi giải quyết vấn đề này?','Bạn nên cân nhắc kỹ trước khi thực hiện thay đổi nào?']
];
