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
// Five new vocabulary items per day. The seven rows in each group follow its seven lesson topics.
const dailyVocabularySets = [
    [
        'routine=thói quen;alarm=chuông báo thức;sunrise=bình minh;breakfast=bữa sáng;shower=việc tắm vòi sen',
        'outfit=bộ trang phục;backpack=ba lô;lunchbox=hộp cơm;house keys=chìa khóa nhà;morning checklist=danh sách chuẩn bị buổi sáng',
        'arrival=sự đến nơi;entrance=lối vào;reception=quầy lễ tân;elevator=thang máy;workspace=không gian làm việc',
        'teammate=đồng đội;relationship=mối quan hệ;trust=sự tin tưởng;cooperation=sự hợp tác;conversation=cuộc trò chuyện',
        'obstacle=trở ngại;confidence=sự tự tin;patience=sự kiên nhẫn;challenge=thử thách;courage=lòng can đảm',
        'reminder=lời nhắc;priority=việc ưu tiên;attention=sự chú ý;resumption=sự tiếp tục;momentum=đà tiến triển',
        'habit=thói quen;consistency=sự đều đặn;improvement=sự cải thiện;discipline=tính kỷ luật;motivation=động lực'
    ],
    [
        'hobby=sở thích;interest=sự quan tâm;painting=việc vẽ tranh;gardening=việc làm vườn;collection=bộ sưu tập',
        'chore=việc nhà;laundry=đồ giặt;dishes=bát đĩa;trash=rác;tidiness=sự ngăn nắp',
        'meeting=cuộc họp;attendance=sự tham dự;participant=người tham gia;agenda=chương trình họp;discussion=cuộc thảo luận',
        'responsibility=trách nhiệm;ownership=sự chịu trách nhiệm;duty=bổn phận;assignment=nhiệm vụ được giao;care=sự chăm sóc',
        'workload=khối lượng công việc;commitment=sự cam kết;initiative=sự chủ động;capacity=năng lực đáp ứng;accountability=trách nhiệm giải trình',
        'handover=việc bàn giao;successor=người tiếp nhận;transition=sự chuyển giao;briefing=buổi hướng dẫn ngắn;continuity=tính liên tục',
        'choice=sự lựa chọn;criteria=các tiêu chí;trade-off=sự đánh đổi;consequence=hệ quả;judgment=sự phán đoán'
    ],
    [
        'decision=quyết định;alternative=phương án khác;consensus=sự đồng thuận;proposal=đề xuất;approval=sự phê duyệt',
        'progress=tiến độ;milestone=cột mốc;achievement=thành tựu;improvement plan=kế hoạch cải thiện;growth=sự phát triển',
        'quality=chất lượng;accuracy=độ chính xác;inspection=sự kiểm tra;standard=tiêu chuẩn;defect=khiếm khuyết',
        'delay=sự chậm trễ;setback=bước lùi;recovery=sự khôi phục;compensation=sự bù đắp;deadline=thời hạn',
        'research=nghiên cứu;inquiry=sự tìm hiểu;source=nguồn thông tin;finding=phát hiện;hypothesis=giả thuyết',
        'interview=buổi phỏng vấn;preparation=sự chuẩn bị;qualification=năng lực chuyên môn;experience=kinh nghiệm;strength=điểm mạnh',
        'feature=tính năng;importance=tầm quan trọng;impact=tác động;ranking=sự xếp hạng;roadmap=lộ trình phát triển'
    ],
    [
        'requirement=yêu cầu;specification=bản đặc tả;review=sự xem xét;clarification=sự làm rõ;acceptance=sự chấp nhận',
        'log=nhật ký hệ thống;trace=dấu vết;timestamp=dấu thời gian;incident=sự cố;diagnosis=sự chẩn đoán',
        'release=đợt phát hành;deployment=việc triển khai;readiness=mức sẵn sàng;authorization=sự cho phép;rollout=việc triển khai dần',
        'design=bản thiết kế;revision=bản chỉnh sửa;layout=bố cục;prototype=bản mẫu;iteration=lần cải tiến',
        'item=mục;sequence=trình tự;continuation=sự tiếp tục;facilitator=người điều phối;minutes=biên bản họp',
        'launch=buổi ra mắt;webpage=trang web;publication=việc công bố;announcement=thông báo;visibility=khả năng hiển thị',
        'process=quy trình;checklist=danh sách kiểm tra;workflow=luồng công việc;handoff point=điểm bàn giao;completion=sự hoàn tất'
    ],
    [
        'idea=ý tưởng;solution=giải pháp;creativity=sự sáng tạo;brainstorm=việc động não;inspiration=nguồn cảm hứng',
        'resource=tài nguyên;reference=tài liệu tham khảo;repository=kho lưu trữ;guide=tài liệu hướng dẫn;discovery=sự khám phá',
        'question=câu hỏi;uncertainty=sự chưa rõ;parking lot=danh sách vấn đề để sau;follow-up=việc theo dõi tiếp;context=bối cảnh',
        'comparison=sự so sánh;benefit=lợi ích;drawback=điểm bất lợi;compromise=sự thỏa hiệp;balance=sự cân bằng',
        'update=bản cập nhật;version=phiên bản;changelog=nhật ký thay đổi;notification=thông báo nhắc nhở;availability=tình trạng sẵn có',
        'status=trạng thái;report=báo cáo;trend=xu hướng;forecast=dự báo;indicator=chỉ báo',
        'teamwork=tinh thần đồng đội;contribution=sự đóng góp;coordination=sự phối hợp;alignment=sự thống nhất;shared goal=mục tiêu chung'
    ],
    [
        'feedback=phản hồi;suggestion=đề xuất cải thiện;criticism=lời phê bình;praise=lời khen;receptiveness=sự sẵn lòng tiếp nhận',
        'help=sự giúp đỡ;assistance=sự hỗ trợ;request=lời yêu cầu;mentor=người hướng dẫn;guidance=sự chỉ dẫn',
        'persistence=sự kiên trì;effort=nỗ lực;encouragement=sự động viên;resilience=khả năng phục hồi;determination=sự quyết tâm',
        'equipment=thiết bị;return=việc trả lại;inventory=danh mục thiết bị;condition=tình trạng;receipt=biên nhận',
        'output=đầu ra;error message=thông báo lỗi;signal=tín hiệu;explanation=lời giải thích;interpretation=sự diễn giải',
        'demo=buổi trình diễn;presentation=bài thuyết trình;audience=người xem;preview=bản xem trước;scenario=tình huống',
        'cause=nguyên nhân;effect=tác động gây ra;factor=yếu tố;trigger=tác nhân kích hoạt;chain reaction=phản ứng dây chuyền'
    ],
    [
        'technology=công nghệ;advancement=tiến bộ kỹ thuật;newsletter=bản tin;learning curve=độ khó khi học;awareness=sự nắm bắt',
        'practice=việc luyện tập;regularity=tính thường xuyên;repetition=sự lặp lại;fluency=sự trôi chảy;retention=khả năng ghi nhớ',
        'bug=lỗi phần mềm;tracker=công cụ theo dõi;ticket=phiếu công việc;backlog=danh sách việc tồn;resolution=sự giải quyết',
        'calendar=lịch;due date=ngày đến hạn;alert=cảnh báo;timeframe=khung thời gian;urgency=tính cấp bách',
        'contact=người liên hệ;connection=mối liên kết;networking=việc xây dựng quan hệ;message=tin nhắn;correspondence=việc trao đổi thư từ',
        'production=môi trường thực tế;safeguard=biện pháp bảo vệ;isolation=sự cách ly;boundary=ranh giới;protection=sự bảo vệ',
        'stamina=sức bền;mindset=tư duy;optimism=sự lạc quan;reward=phần thưởng;steadiness=sự vững vàng'
    ],
    [
        'reschedule=dời lịch;postponement=sự hoãn lại;availability window=khoảng thời gian rảnh;invitation=lời mời;confirmation=sự xác nhận',
        'outline=dàn ý;slide=trang chiếu;walkthrough=buổi trình bày từng bước;rehearsal=buổi tập dượt;showcase=buổi giới thiệu',
        'pitch=lời đề xuất;originality=tính mới mẻ;feasibility=tính khả thi;persuasion=sự thuyết phục;recommendation=lời đề xuất',
        'implementation=việc áp dụng;procedure=thủ tục;adoption=sự tiếp nhận;rollout plan=kế hoạch triển khai;application=việc ứng dụng',
        'device=thiết bị;storage=nơi lưu trữ;label=nhãn;cabinet=tủ;organization=sự sắp xếp',
        'hotfix=bản sửa lỗi khẩn;patch=bản vá;urgency level=mức độ khẩn cấp;incident response=ứng phó sự cố;verification=sự xác minh',
        'performance=hiệu suất;latency=độ trễ;bottleneck=điểm nghẽn;optimization=sự tối ưu;responsiveness=độ phản hồi'
    ],
    [
        'issue=vấn đề;symptom=triệu chứng;anomaly=điểm bất thường;investigation=việc điều tra;root cause=nguyên nhân gốc',
        'memory=bộ nhớ;shortage=sự thiếu hụt;exhaustion=sự cạn kiệt;allocation=sự phân bổ;limit=giới hạn',
        'test=kiểm thử;test case=ca kiểm thử;flow=luồng thao tác;assertion=điều kiện kiểm tra;coverage=độ bao phủ',
        'second opinion=ý kiến thứ hai;consultation=sự tham vấn;peer review=sự xem xét của đồng nghiệp;perspective=góc nhìn;advice=lời khuyên',
        'runtime=môi trường chạy;service=dịch vụ;server=máy chủ;environment=môi trường;platform=nền tảng',
        'constraint=ràng buộc;workaround=cách khắc phục tạm;restriction=sự hạn chế;adaptation=sự thích nghi;flexibility=tính linh hoạt',
        'audit=việc rà soát;final check=lần kiểm tra cuối;omission=điều bị bỏ sót;validation=sự xác thực;sign-off=sự chấp thuận cuối'
    ],
    [
        'login=việc đăng nhập;credential=thông tin đăng nhập;authentication=xác thực danh tính;session=phiên làm việc;access=quyền truy cập',
        'codebase=kho mã nguồn;maintenance=việc bảo trì;ownership map=sơ đồ người phụ trách;documentation=tài liệu;stability=tính ổn định',
        'clue=manh mối;pattern=quy luật;correlation=mối tương quan;underlying issue=vấn đề tiềm ẩn;debugging=việc gỡ lỗi',
        'manual=sổ tay;instruction=hướng dẫn;example=ví dụ;search term=từ khóa tìm kiếm;definition=định nghĩa',
        'career=sự nghiệp;aspiration=khát vọng;pathway=con đường phát triển;skill gap=khoảng thiếu kỹ năng;opportunity=cơ hội',
        'edge case=trường hợp biên;watchpoint=điểm cần theo dõi;warning=dấu hiệu cảnh báo;monitoring=việc giám sát;exception=trường hợp ngoại lệ',
        'reflection=sự nhìn lại;lesson learned=bài học rút ra;retrospective=buổi nhìn lại;insight=sự hiểu biết mới;next step=bước tiếp theo'
    ],
    [
        'scope=phạm vi;decline=sự từ chối;boundary setting=việc đặt ranh giới;out-of-scope request=yêu cầu ngoài phạm vi;negotiation=sự thương lượng',
        'surprise=điều bất ngờ;outcome=kết quả;discrepancy=sự khác biệt;expectation=sự kỳ vọng;observation=sự quan sát',
        'expansion=sự mở rộng;complexity=độ phức tạp;growth in scope=sự tăng phạm vi;estimate=ước lượng;reassessment=sự đánh giá lại',
        'counsel=lời khuyên;expertise=chuyên môn;consultant=người tư vấn;input=ý kiến đóng góp;recommendation request=lời xin gợi ý',
        'debug log=nhật ký gỡ lỗi;switch=công tắc;setting=cài đặt;diagnostic mode=chế độ chẩn đoán;trace level=mức ghi dấu vết',
        'feature flag=cờ tính năng;deactivation=sự tắt đi;legacy setting=cài đặt cũ;cleanup=việc dọn dẹp;sunset plan=kế hoạch ngừng dùng',
        'turnaround=sự xoay chuyển;contingency=phương án dự phòng;catch-up plan=kế hoạch bắt kịp;acceleration=sự tăng tốc;revised date=ngày điều chỉnh'
    ],
    [
        'user report=báo cáo người dùng;severity=mức độ nghiêm trọng;triage=sự phân loại;queue=hàng đợi;customer impact=ảnh hưởng đến khách hàng',
        'request volume=lượng yêu cầu truy cập;surge=sự tăng vọt;throughput=lượng xử lý;load=khối lượng tải;scaling=việc mở rộng quy mô',
        'form validation=kiểm tra biểu mẫu;invalid input=dữ liệu nhập không hợp lệ;rule=quy tắc;field=trường dữ liệu;error state=trạng thái lỗi',
        'test failure=ca kiểm thử thất bại;failure mode=kiểu lỗi;reproduction=việc tái hiện lỗi;fix=bản sửa lỗi;regression=việc lỗi tái xuất hiện',
        'approach=cách tiếp cận;method=phương pháp;strategy=chiến lược;selection=sự lựa chọn;decision matrix=bảng so sánh quyết định',
        'browser limitation=giới hạn trình duyệt;compatibility=khả năng tương thích;fallback=phương án thay thế;capability=khả năng;support matrix=bảng hỗ trợ',
        'confirmed fix=bản sửa đã xác nhận;proof=bằng chứng;repeat test=lần kiểm thử lại;confidence check=bước kiểm tra độ tin cậy;closure=việc khép lại'
    ],
    [
        'release plan=kế hoạch phát hành;timeline=mốc thời gian;stakeholder=bên liên quan;discussion point=điểm cần thảo luận;decision owner=người quyết định',
        'designer=nhà thiết kế;mockup=bản phác thảo;visual hierarchy=thứ bậc thị giác;usability=tính dễ sử dụng;collaboration=sự cộng tác',
        'option=phương án;advantage=lợi thế;disadvantage=bất lợi;comparison table=bảng so sánh;preference=sự ưu tiên',
        'setup=cài đặt ban đầu;step=bước;demonstration=sự minh họa;prerequisite=điều kiện tiên quyết;instructional note=ghi chú hướng dẫn',
        'concern=mối lo;hesitation=sự ngần ngại;objection=ý kiến phản đối;risk=nguy cơ;voice=tiếng nói',
        'accessibility=khả năng tiếp cận;screen reader=trình đọc màn hình;keyboard navigation=điều hướng bàn phím;contrast=độ tương phản;inclusion=sự hòa nhập',
        'point of view=quan điểm;main point=ý chính;emphasis=sự nhấn mạnh;summary=bản tóm tắt;clarity=sự rõ ràng'
    ],
    [
        'upload=tải lên;file picker=bộ chọn tệp;progress bar=thanh tiến độ;upload limit=giới hạn tải lên;transfer=sự truyền tải',
        'cross-functional team=nhóm liên chức năng;specialist=chuyên gia;handoff=việc bàn giao;shared responsibility=trách nhiệm chung;coordination cost=chi phí phối hợp',
        'speed=tốc độ;benchmark=mốc đo hiệu suất;response time=thời gian phản hồi;performance budget=ngân sách hiệu suất;efficiency=hiệu quả',
        'workplan=kế hoạch công việc;target date=ngày mục tiêu;time pressure=áp lực thời gian;prioritization=sự sắp xếp ưu tiên;delivery=việc bàn giao',
        'platform limit=giới hạn nền tảng;technical ceiling=giới hạn kỹ thuật;workaround design=thiết kế khắc phục tạm;dependency=điều kiện phụ thuộc;interoperability=khả năng tương tác',
        'review comment=nhận xét rà soát;revision request=yêu cầu chỉnh sửa;constructive feedback=góp ý mang tính xây dựng;response plan=kế hoạch phản hồi;follow-through=việc theo đến cùng',
        'responsive layout=bố cục thích ứng;viewport=khung nhìn;mobile screen=màn hình điện thoại;breakpoint=điểm ngắt;device size=kích thước thiết bị'
    ],
    [
        'simplicity=sự đơn giản;minimal design=thiết kế tối giản;essential feature=tính năng thiết yếu;distraction=yếu tố gây xao nhãng;practicality=tính thực tế',
        'illustration=hình minh họa;sample=ví dụ mẫu;analogy=phép so sánh;concrete case=trường hợp cụ thể;reference point=điểm tham chiếu',
        'proposal review=việc xem xét đề xuất;assumption=giả định;evidence=bằng chứng;reasoning=lập luận;fairness=sự công bằng',
        'edge condition=điều kiện biên;possibility=khả năng;ambiguity=sự mơ hồ;exception path=nhánh ngoại lệ;precaution=biện pháp phòng ngừa',
        'upkeep=việc bảo dưỡng;maintenance schedule=lịch bảo trì;long-term cost=chi phí dài hạn;sustainability=tính bền vững;future need=nhu cầu tương lai',
        'project reflection=sự nhìn lại dự án;takeaway=điều rút ra;mistake=sai lầm;achievement record=ghi nhận thành tựu;perspective shift=sự thay đổi góc nhìn',
        'risky change=thay đổi nhiều rủi ro;reconsideration=sự cân nhắc lại;warning sign=dấu hiệu cảnh báo;safer option=phương án an toàn hơn;informed decision=quyết định có căn cứ'
    ]
].map(group => group.map(row => row.split(';').map(entry => entry.split('='))));
function lessonVocabulary(day) {
    const d = days[day];
    return dailyVocabularySets[d.week][d.di];
}
function lessonReading(day) {
    const d = days[day], frame = readingFrames[d.di], extra = readingExtras[day];
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
['Bạn đang làm tính năng nào?','Bạn làm việc gần gũi nhất với ai?','Bạn đã tìm ra giải pháp như thế nào?','Nhóm của bạn đang hướng tới mục tiêu nào?','Bạn đã khắc phục giới hạn nào?','Bạn nỗ lực giải quyết nhận xét rà soát như thế nào?','Thiết kế nào phù hợp với màn hình điện thoại?'],
['Bạn đang nghĩ đến việc thay đổi điều gì?','Bạn có nghĩ ra một ví dụ hữu ích không?','Bạn nên cân nhắc kỹ đề xuất nào?','Nhóm nên suy xét kỹ những trường hợp biên nào?','Nhóm của bạn có thể tính trước việc bảo trì như thế nào?','Bạn nhớ lại điều gì khi giải quyết vấn đề này?','Bạn nên cân nhắc kỹ trước khi thực hiện thay đổi nào?']
];
