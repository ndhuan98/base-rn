const DATA = [
  {
    id: 1,
    title: 'CÂU HỎI TỪ KHÁCH HÀNG NHẬN HÓA ĐƠN',
    data: [
      {
        id: 1,
        titleMenu: 'Khách hàng có phải thực hiện ký số vào hóa đơn điện tử ?',
        content:
          '- Đối với khách hàng là khách hàng cá nhân, khách hàng lẻ, không cần sử dụng hóa đơn điện tử để kê khai thuế thì không cần thiết phải ký điện tử vào hóa đơn điện tử nhận được \n \n- Đối với khách hàng là doanh nghiệp, đơn vị kế toán cần sử dụng hóa đơn điện tử để kê khai thuế thì bắt buộc phải ký điện tử vào hóa đơn điện tử nhận được thì hóa đơn mới được coi là hóa đơn điện tử hoàn chỉnh và có tính pháp lý, sử dụng được với Cơ quan Thuế \n \n- Đối với hóa đơn mua hàng là điện, nước, viễn thông, khách hàng không nhất thiết phải có chữ ký của người mua và dấu của người bán, hóa đơn vẫn được coi là hóa đơn có tính pháp lý.',
      },
      {
        id: 2,
        titleMenu:
          'Nếu bên bán sử dụng hóa đơn điện tử thì bên mua có thể thanh toán với bên bán bằng phương thức nào?',
        content:
          'Trường hợp bên bán sử dụng hóa đơn điện tử thì bên mua vẫn có thể thanh toán với bên bán bằng các phương thức giống như khi sử dụng hóa đơn giấy: \n- Tiền mặt \n- Chuyển khoản \n- Thẻ tín dụng \n- Các hình thức khác Về thời gian thanh toán trước hay sau khi nhận hóa đơn thì bên mua với bên bán có thể thỏa thuận với nhau để đưa ra phương án hợp lý nhất',
      },
      {
        id: 3,
        titleMenu:
          'Khách hàng (bên mua) có cần phải lưu trữ hóa đơn ở dạng giấy không?',
        content:
          'Khách hàng sau khi mua hàng sẽ được bên bán gửi cho hóa đơn điện tử dưới dạng file .xml. Khách hàng không cần phải lưu trữ hóa đơn mà có thể tra cứu trên trang web tra cứu hóa đơn mà bên bán cung cấp. Nếu cẩn thận khách hàng có thể tải file hóa đơn được nén dưới dạng .zip về để lưu trữ. Trường hợp khách hàng vẫn cần hóa đơn bản giấy để bộ phận kế toán lưu trữ theo Luật kế toán thì bên bán sẽ in một bản hóa đơn chuyển đổi từ hóa đơn điện tử, ký đóng dấu và gửi cho khách hàng.',
      },
      {
        id: 4,
        titleMenu:
          'Khi phát hiện ra thông tin hóa đơn điện tử bị sai sót (thông tin khách hàng, thông tin hàng hóa, giá cả, …) khách hàng phải làm gì?',
        content:
          'Trong trường hợp khách hàng phát hiện ra sai sót trong hóa đơn được nhận, khách hàng cần: \n \n- Liên hệ với bên phát hành hóa đơn (bên bán) để xử lý các sai sót của hóa đơn \n \n- Nếu trường hợp bên mua hàng cần sử dụng hóa đơn để khai báo thuế, bên mua cần phối hợp với bên bán để đưa ra phương án xử lý phù hợp: \n \n+ Lập biên bản điều chỉnh hóa đơn có chữ ký và dấu của hai bên  \n \n+ Lập hóa đơn điều chỉnh, thay thế hoặc xóa bỏ hóa đơn',
      },
      {
        id: 5,
        titleMenu: 'Hóa đơn điện tử có liên không?',
        content:
          'Hóa đơn điện tử chỉ có 1 bản duy nhất nên không có khái niệm liên. Bên phát hành hóa đơn (bên bán), bên tiếp nhận hóa đơn (bên mua) và cơ quan thuế cùng khai thác dữ liệu trên một bản hóa đơn điện tử duy nhất',
      },
      {
        id: 6,
        titleMenu: 'Chữ ký điện tử và chứng thư số là gì?',
        content:
          'Chữ ký điện tử: \n \n- Chữ ký điện tử là thông tin đi kèm dữ liệu (văn bản, hình ảnh, video…) nhằm mục đích xác định người chủ của dữ liệu đó; có thể được hiểu như con dấu điện tử của một doanh nghiệp \n \n- Chữ ký điện tử là một phần không thể tách rời của HĐĐT giúp xác thực HĐĐT đó là của đơn vị phát hành Chứng thư điện tử: \n \n- Chứng thư điện tử là thông điệp dữ liệu do tổ chức cung cấp dịch vụ chứng thực chữ ký điện tử phát hành nhằm xác nhận cơ quan, tổ chức, cá nhân được chứng thực là người ký chữ ký điện tử \n \n- Chứng thư điện tử sử dụng để ký trên hóa đơn điện tử, đảm bảo: \n \n+ Chống từ chối bởi người ký \n \n+ Đảm bảo tính toàn vẹn của HĐĐT trong quá trình lưu trữ, truyền nhận \n \n- Chứng thư điện tử có thời hạn hiệu lực và có thể bị hủy bỏ hoặc thu hồi bởi nhà cung cấp dịch vụ chứng thư điện tử',
      },
      {
        id: 7,
        titleMenu: 'Căn cứ pháp lý của hóa đơn điện tử là gì?',
        content:
          'Việc sử dụng và triển khai thí điểm hóa đơn điện tử được xây dựng trên các căn cứ pháp lý sau: - Các văn bản do Chính phủ ban hành: \n \n+ Luật Giao dịch điện tử 2005. \n \n+ Nghị định số 51/2010/NĐ-CP ngày 14/05/2010 của Chính Phủ quy định về hóa đơn bán hàng hóa, cung ứng dịch vụ. \n \n+ Nghị định số 57/2006/NĐ-CP ngày 09/6/2006 của Chính phủ về thương mại điện tử.\n \n+ Nghị định số 26/2007/NĐ-CP ngày 15/02/2007 của Chính phủ về việc quy định chi tiết thi hành Luật Giao dịch điện tử về chữ ký số và dịch vụ chứng thực chữ ký số. \n \n+ Nghị định số 27/2007/NĐ-CP ngày 23/02/2007 của Chính phủ về giao dịch điện tử trong hoạt động tài chính. \n \n+ Nghị định số 106/2011/NĐ-CP ngày 23/11/2011 của Chính phủ về việc sửa đổi, bổ sung một số điều của Nghị định số 26/2007/NĐ-CP ngày 15/02/2007 của Chính phủ. - Các văn bản do Bộ tài chính ban hành: \n \n+ Thông tư số 153/2010/TT-BTC ngày 28/9/2010 của Bộ Tài chính, hướng dẫn thi hành Nghị định số 51/2010/NĐ-CP ngày 14/05/2010 của Chính phủ quy định về hóa đơn bán hàng hóa, cung ứng dịch vụ. \n \n+ Thông tư số 32/2011/TT-BTC ngày 14/3/2011 của Bộ Tài Chính hướng dẫn về khởi tạo, phát hành và sử dụng hóa đơn điện tử bán hàng hóa, cung ứng dịch vụ. \n \n+ Thông tư số 39/2014/TT-BTC ngày 31/3/2014 của Bộ Tài Chính hướng dẫn thi hành Nghị định số 51/2010/NĐ-CP ngày 14/5/2010 và Nghị định số 04/2014/NĐ-CP ngày 17/01/2014 của Chính phủ quy định về hóa đơn bán hàng hóa, cung ứng dịch vụ',
      },
      {
        id: 8,
        titleMenu: 'Hóa đơn điện tử là gì?',
        content:
          '- Hóa đơn điện tử là tập hợp các thông điệp dữ liệu điện tử về bán hàng hóa, cung ứng dịch vụ, được khởi tạo, lập, gửi, nhận, lưu trữ và quản lý bằng phương tiện điện tử \n \n- Hóa đơn điện tử là 1 trong 3 hình thức hóa đơn (Hóa đơn tự in; Hóa đơn đặt in; Hóa đơn điện tử). Thay vì hóa đơn tạo lập trên giấy, hóa đơn điện tử được tạo lập và lưu trữ trên thiết bị điện tử. \n \n- Hóa đơn điện tử gồm các loại: hóa đơn xuất khẩu; hóa đơn giá trị gia tăng; hóa đơn bán hàng; hóa đơn khác gồm: tem, vé, thẻ, phiếu thu tiền bảo hiểm…; phiếu thu tiền cước vận chuyển hàng không, chứng từ thu cước phí vận tải quốc tế, chứng từ thu phí dịch vụ ngân hàng…; hình thức và nội dung được lập theo thông lệ quốc tế và các quy định của pháp luật có liên quan \n \n- Hóa đơn điện tử có thể chuyển đổi thành hóa đơn giấy trong nhu cầu lưu thông hàng hóa, quản lý hóa đơn của người bán hoặc người mua',
      },
    ],
  },
  {
    id: 2,
    title: 'CÂU HỎI TỪ DOANH NGHIỆP XUẤT HÓA ĐƠN',
    data: [
      {
        id: 1,
        titleMenu:
          'Hóa đơn điện tử không yêu cầu in ra thì đối với quy định phải xuất hóa đơn đi đường chứng minh nguồn gốc thì phải giải trình thế nào với lực lượng chức năng?',
        content:
          'Trường hợp này doanh nghiệp buộc phải in chuyển đổi hóa đơn điện tử ra hóa đơn giấy và tuân thủ theo quy định sau: \n \n- Người bán hàng hóa được chuyển đổi hóa đơn điện tử sang hóa đơn giấy để chứng minh nguồn gốc xuất xứ hàng hóa hữu hình trong quá trình lưu thông và chỉ được chuyển đổi (01) lần - Hóa đơn điện tử chuyển sang hóa đơn giấy phải đáp ứng đủ điều kiện sau: \n \n+ Phản ánh toàn vẹn nội dung của hóa đơn điện tử gốc; \n \n+ Có ký hiệu riêng xác nhận đã được chuyển đổi từ hóa đơn điện tử sang hóa đơn giấy (dòng chữ phân biệt giữa hóa đơn chuyển đổi và hóa đơn điện tử gốc \n \n- hóa đơn nguồn (ghi rõ “HÓA ĐƠN CHUYỂN ĐỔI TỪ HÓA ĐƠN ĐIỆN TỬ”)) \n \n+ Có chữ ký và họ tên của người thực hiện chuyển từ hóa đơn điện tử sang hóa đơn giấy (chữ ký người đại diện theo pháp luật của người bán, dấu của người bán)',
      },
      {
        id: 2,
        titleMenu:
          'Phát hành hóa đơn có bị giới hạn về số lượng phát hành hay không?',
        content:
          'Hiện nay, chính sách đã bỏ giới hạn về số lượng hóa đơn thông báo phát hành trên hóa đơn giấy, hóa đơn điện tử cũng tương tự không giới hạn về số lượng phát hành. Tuy nhiên, theo quy định số hóa đơn là 7 số nên vẫn có tối đa là 9.999.999 hóa đơn được phát hành cho một mẫu số, ký hiệu đó',
      },
      {
        id: 3,
        titleMenu:
          'Doanh nghiệp có thể đăng ký song song hai hình thức lập hóa đơn giấy (đặt in, tự in) và hóa đơn điện tử hay không?',
        content:
          'Hiện nay, doanh nghiệp có thể hoàn toàn sử dụng hai hình thức lập hóa đơn song song và nộp báo cáo tình hình sử dụng hóa đơn như quy trình bình thường',
      },
      {
        id: 4,
        titleMenu:
          'Hiện nay, việc xuất hóa đơn kèm bảng kê khá phổ biến. Vậy việc xuất hóa đơn kèm bảng kê đối với hóa đơn điện tử thì như thế nào?',
        content:
          'Hóa đơn điện tử không giới hạn số dòng như hóa đơn giấy đặt in thông thường, do vậy doanh nghiệp có thể xuất hóa đơn với rất nhiều dòng mà không cần phải đính kèm bảng kê',
      },
      {
        id: 5,
        titleMenu:
          'Việc viết tắt trên hóa đơn điện tử có gì khác các loại hóa đơn khác không?',
        content:
          'Đối với hóa đơn điện tử, tiêu thức ‘tên, địa chỉ, mã số thuế của người mua” không bị hạn chế số ký tự như đối với các loại hình hóa đơn khác và cũng phù hợp với nội dung Điều 16, mục 2, khoản b Thông tu 39/2014/TT-BTC ngày 31/03/2014 hướng dẫn thi hành Nghị định số 51/2010/NĐ-CP ngày 14/05/2010; Và Nghị định số 04/2014/NĐ-CP ngày 17/01/2014 của Chính phủ quy định về hóa đơn bán hàng hóa, cung ứng dịch vụ quy định “Trường hợp tên, địa chỉ người mua quá dài, trên hóa đơn người bán được viết ngắn gọn một số danh từ thông dụng như “Phường” thành “P”, “Quận” thành “Q”, “Thành phố” thành “TP”, “Việt Nam” thành “VN” hoặc “Cổ phần” thành “CP”, “Trách nhiệm hữu hạn” thành “TNHH”, “Khu công nghiệp” thành “KCN”, “sản xuất” thành SX, “chi nhánh” thành “CN”…nhưng phải đảm bảo đầy đủ số nhà, tên đường phố, phường, xã, quận, huyện, thành phố, xác định được chính xác tên, địa chỉ doanh nghiệp và phù hợp với đăng ký kinh doanh, đăng ký thuế của doanh nghiệp',
      },
      {
        id: 6,
        titleMenu:
          'Nếu chuyển sang sử dụng hóa đơn điện tử thì sẽ phải kê khai thuế như thế nào?',
        content:
          'Hóa đơn điện tử là một hình thức hóa đơn, có đầy đủ giá trị pháp lý theo quy định của pháp luật nên hóa đơn này là căn cứ để hạch toán kế toán và kê khai thuế. Vì vậy, khi doanh nghiệp chuyển sang sử dụng hóa đơn điện tử thì doanh nghiệp vẫn kê khai thuế bình thường như khi sử dụng hóa đơn giấy',
      },
      {
        id: 7,
        titleMenu:
          'Nếu khách hàng vẫn muốn nhận hóa đơn giấy thì phải làm thế nào?',
        content:
          'Trong trường hợp khách hàng vẫn muốn nhận hóa đơn dưới dạng giấy, doanh nghiệp có thể in hóa đơn chuyển đổi từ hóa đơn điện tử, ký tên, đóng dấu đỏ và gửi cho khách hàng',
      },
      {
        id: 8,
        titleMenu: 'Doanh nghiệp (bên bán) có cần phải lưu trữ hóa đơn không?',
        content:
          'Theo luật kế toán và luật giao dịch điện tử, doanh nghiệp (bên bán) vẫn cần phải lưu trữ hóa đơn điện tử trong vòng 10 năm giống như lưu trữ hóa đơn giấy. Nhưng doanh nghiệp khi sử dụng phần mềm hóa đơn điện tử có thể không cần lưu trữ hóa đơn dưới dạng giấy nữa mà chỉ cần lưu trữ hóa đơn dưới dạng điện tử là file .xml. Khi sử dụng phần mềm lập hóa đơn, tất cả thông tin hóa đơn đã được lưu trữ trong cơ sở dữ liệu của phần mềm. Khi cần thiết, doanh nghiệp có thể tra cứu lại hóa đơn trong phần mềm, hoặc doanh nghiệp có thể sao lưu, export file nén hóa đơn dưới dạng .zip từ phần mềm ra để lưu trữ lại trên máy tính khác hoặc trong ổ cứng lưu trữ.',
      },
      {
        id: 9,
        titleMenu: 'Hóa đơn điện tử áp dụng cho các loại hóa đơn nào?',
        content:
          'Hóa đơn điện tử sẽ được áp dụng cho các loại hóa đơn sau: \n \n- Hóa đơn giá trị gia tăng 01GTGT \n \n- Hóa đơn bán hàng 02GTTT  \n \n- Hóa đơn bán hàng (dành cho tổ chức, cá nhân trong khu phi thuế quan) 07KPTQ \n \n- Phiếu xuất kho kiêm vận chuyển hàng hóa nội bộ 03XKNB \n \n- Phiếu xuất kho gửi bán hàng đại lý 04HGDL',
      },
      {
        id: 10,
        titleMenu: 'Hóa đơn điện tử mang lại lợi ích gì cho doanh nghiệp?',
        content:
          'Việc áp dụng hóa đơn điện tử mang lại rất nhiều lợi ích cho doanh nghiệp như: \n \n- Giảm chi phí in ấn hóa đơn, lưu trữ hóa đơn, vận chuyển hóa đơn, nâng cao hiệu quả sản xuất, kinh doanh, tránh được tình trạng cháy, hỏng, mất hóa đơn.\n \n  - Đảm bảo độ chính xác và an toàn cao, tránh tình trạng làm giả hóa đơn: quy trình xác thực hóa đơn khép kín với nhiều bước bảo mật giúp hóa đơn khó có thể bị giả mạo.\n \n- Tiết kiệm thời gian cho doanh nghiệp, giảm thiểu các thủ tục hành chính: Có thể tạo mẫu hóa đơn, phát hành hóa đơn ngay tại doanh nghiệp và gửi lên cơ quan thuế qua đường điện tử \n \n- Doanh nghiệp có thể tạo lập và gửi hóa đơn cho khách hàng ngay sau khi ký số thông qua nhiều hình thức như: Gửi hóa đơn cho khách hàng qua hệ thống email tích hợp trên phần mềm, thông báo cho khách hàng nhận hóa đơn trên website, qua hình thức tin nhắn SMS hoặc Export ra file zip để gửi cho khách hàng qua hình thức gửi email thông thường, copy vào USB',
      },
    ],
  },
];
const DATAEINVOICE = [
  {
    id: 1,
    title: 'Mẫu hóa đơn',
    data: [
      {
        id: 1,
        titleMenu:
          'Tôi có sửa mẫu hóa đơn để bổ sung một số trường thông tin mở rộng về mã khách hàng, địa điểm giao hàng, nhân viên bán hàng…nhưng khi xem hóa đơn đã phát hành thì không thấy hiển thị những thông tin này?',
        content:
          'TH1: Khi đơn vị mình xem hóa đơn thì phần mềm sẽ lấy các thông tin tại thời điểm phát hành hóa đơn đó, vì vậy những thông tin được thêm hoặc sửa sau thời điểm sẽ không thể hiện khi xem để đảm bảo tính đúng đắn của hóa đơn đã phát hành. Nếu đơn vị muốn hiển thị những thông tin này thì phải xóa hóa đơn cũ và lập hóa đơn mới, sau đó thực hiện phát hành. Thực hiện cập nhật lại mẫu trên phần mềm \n \n- Xem hướng dẫn chi tiết tại tài liệu HDSD TH2: nếu hóa đơn của doanh nghiệp là hóa đơn điện tử có mã của cơ quan Thuế thì không thể thay đổi các thông tin trên mẫu hóa đơn đã đăng ký',
      },
      {
        id: 2,
        titleMenu: 'Làm thế nào để sửa mẫu hóa đơn?',
        content:
          'Hiện tại Thái Sơn có đội ngũ thiết kế và chỉnh sữa mẫu hóa đơn cho doanh nghiệp. Khi có bất cứ yêu cầu mới hoặc thay đổi thông tin trên mẫu, đội ngũ thiết kế sẽ hỗ trợ doanh nghiệp chỉnh sửa để doanh nghiệp đăng ký mẫu với Cơ quan Thuế ',
      },
      {
        id: 3,
        titleMenu:
          'Doanh nghiệp tôi có nhiều cửa hàng chung một mã số thuế, vậy mẫu hóa đơn sẽ khởi tạo và phát hành như thế nào trên E-Invoices?',
        content:
          'Đối với doanh nghiệp có nhiều mã số thuế, hoặc chuỗi cửa hàng, nhà hàng hoặc doanh nghiệp có nhiều chi nhánh, phòng ban chung một mã số thuế thì nên mỗi cửa hàng một dải ký hiệu riêng Ví dụ: mẫu hóa đơn chung 01GTKT0/001 Nhưng nhà hàng A: Mẫu số: 01GTKT0/001 ký hiệu AA/19E Nhà hàng B: Mẫu số 01GTKT0/001 ký hiệu AB/19E Hệ thống có chức năng cho phép người dùng phân ký hiệu hóa đơn cho từng phòng ban \n \n- Sau khi được phân dải hóa đơn, account của user bộ phận tự động nhận được thông báo đã được phân ký hiệu và dải hóa đơn từ số bao nhiêu đến số bao nhiêu  \n \n- User xuất hóa đơn của phòng ban nào chỉ được sử dụng hóa đơn có ký hiệu đã được phân cho phòng ban đó \n \n- Sau khi phân ký hiệu hóa đơn, mỗi lần thông báo phát hành thêm, dải số hóa đơn phát hành thêm tự động cập nhật vào dải số có ký hiệu tương ứng của mỗi phòng ban \n \n- Một bộ phận có thể sử dụng nhiều ký hiệu hóa đơn.\n \n  - Cùng 1 mẫu số hóa đơn, cùng 1 ký hiệu hóa đơn, cùng 1 số hóa đơn hệ thống chặn không được phân cho >1 bộ phận Xem chi tiết hướng dẫn khởi tạo, phát hành tại tài liệu HDSD',
      },
    ],
  },
  {
    id: 2,
    title: 'Phát hành hóa đơn',
    data: [
      {
        id: 1,
        titleMenu:
          'Khi phát hành HĐĐT chương trình cảnh báo không có mẫu số hóa đơn nào được phát hành hoặc đã phát hành hết thì làm thế nào?',
        content:
          'Không có mẫu số hóa đơn hoặc đã phát hành hết hóa đơn thì vui lòng kiểm tra lại:\n \n- Nếu chưa thông báo phát hành hóa đơn, bạn cần lập thông báo phát hành để nộp cho cơ quan thuế trước khi phát hành hóa đơn tối thiểu 2 ngày \n \n- Nếu đã thông báo phát hành hóa đơn, bạn cần cập nhật trạng thái thông báo thành “Đã phát hành” trước khi phát hành hóa đơn',
      },
      {
        id: 2,
        titleMenu:
          'Doanh nghiệp tôi muốn thông báo phát hành hóa đơn mới cho năm tài chính tiếp theo nhưng vẫn sử dụng nốt các hóa đơn theo mẫu cũ có được không?',
        content:
          'Trường hợp doanh nghiệp phát hành mẫu hóa đơn mới (vẫn dựa trên Mẫu số hóa đơn và Ký hiệu hóa đơn cũ) thì khi phát hành sẽ là mẫu hóa đơn mới.Vì vậy doanh nghiệp nên sử dụng hết các hóa đơn theo mẫu cũ rồi sau đó mới thông báo phát hành mẫu hóa đơn mới.',
      },
    ],
  },
  {
    id: 3,
    title: 'Xuất hóa đơn',
    data: [
      {
        id: 1,
        titleMenu:
          'Hệ thống E-Invoices có hỗ trợ xuất hóa đơn kèm bảng kê hay không?',
        content:
          'Hiện nay hệ thống E-Invoices hỗ trợ xuất hóa đơn không sử dụng bảng kê và có sử dụng bảng kê: \n \n- Nếu không sử dụng bảng kê: Thì sẽ liệt kê chi tiết hàng từ trang này sang trang khác. Khách hàng chọn mẫu hóa đơn: \n \n+ Hóa đơn nhiều trang (tiêu đề hóa đơn lặp lại ở mỗi trang) \n \n+ Tự động tràn trang (tiêu đề hóa đơn chỉ lặp lại ở trang đầu tiên)\n   - Có sử dụng bảng kê: hỗ trợ khách hàng nhập tên hàng chung hoặc để mặc định, hỗ trợ ký hoặc không ký điện tử bảng kê, hỗ trợ đẩy dữ liệu hoặc không đẩy dữ liệu bảng kê lên website tra cứu',
      },
      {
        id: 2,
        titleMenu:
          'Doanh nghiệp hoàn toàn có thể lựa chọn hình thức xuất hóa đơn là hóa đơn giấy hoặc hóa đơn điện tử cho khách hàng',
        content:
          'Doanh nghiệp hoàn toàn có thể lựa chọn hình thức xuất hóa đơn là hóa đơn giấy hoặc hóa đơn điện tử cho khách hàng',
      },
      {
        id: 3,
        titleMenu: 'Cách tra cứu hóa đơn điện tử trên website tra cứu?',
        content:
          'Bước 1: Truy cập vào Website \n Bước 2: Nhập tên đăng nhập, mật khẩu, sau đó chọn nút “Đăng nhập” \n Bước 3: Sau khi đăng nhập, bạn có thể tra cứu hóa đơn điện tử của bạn \n Bước 4: Trường hợp khách hàng là đơn vị kế toán thì cần phải ký số vào hóa đơn với tư cách là khách hàng \n Bước 5: Tải hóa đơn về máy tính để lưu trữ',
      },
      {
        id: 4,
        titleMenu:
          'Doanh nghiệp tôi đã thiết lập email gửi hóa đơn thành công nhưng khi gửi email hóa đơn, khách hàng vẫn không nhận được?',
        content:
          'Trường hợp doanh nghiệp sử dụng nhà cung cấp gửi email là Gmail hoặc Yahoo thì phải thiết lập việc xác minh 2 bước và đăng nhập bằng thiết bị kém an toàn. Tham khảo phần lưu ý trong Hướng dẫn sử dụng',
      },
      {
        id: 5,
        titleMenu:
          ' Để xem được hóa đơn điện tử khách hàng có cần phải cài đặt thêm phần mềm nào nữa không?',
        content:
          'Để xem được hóa đơn điện tử, máy tính của khách hàng nếu chưa có thì cần cài đặt thêm các chương trình như: - Chương trình giải nén Winrar, hoặc dùng tính năng giải nén của Windows dùng để giải nén file .zip - Chương trình đọc file PDF có thể là Foxit Reader, Adobe Reader,..để xem hóa đơn điện tử chuyển đổi dưới dạng PDF',
      },
      {
        id: 6,
        titleMenu:
          ' Doanh nghiệp tôi có thể dùng chứng thư số của hệ thống iHTKK để ký hóa đơn điện tử cho khách hàng được không',
        content:
          'Doanh nghiệp có thể dùng chứng thư số của hệ thống iHTKK để ký hóa đơn điện tử. Ngoài ra, doanh nghiệp có thể đăng ký cùng lúc sử dụng nhiều chứng thư số khác để ký hóa đơn điện tử. Yêu cầu chứng thư số đó phải hợp lệ (là chứng thư số có mã số thuế của doanh nghiệp, còn hạn sử dụng và không thuộc danh sách cách chứng thư số bị thu hồi)',
      },
      {
        id: 7,
        titleMenu:
          'Doanh nghiệp tôi có nhiều người xuất hóa đơn thì phải làm thế nào? Tôi có thể sử dụng nhiều chữ ký số được không?',
        content:
          '- Đối với hóa đơn điện tử, doanh nghiệp hoàn toàn chủ động về số lượng người xuất hóa đơn tùy thuộc vào phần mềm. Phần mềm E-INVOICES của Công ty Thái Sơn cung cấp cho quý khách hàng với nhiều tính năng ưu việt, giúp doanh nghiệp có thể xuất hóa đơn trên nhiều máy tính chỉ với 1 chữ ký số - Còn về chữ ký số, doanh nghiệp có thể sử dụng nhiều chữ ký số để thực hiện lập hóa đơn và ký điện tử cho hóa đơn. Nhưng cần đảm bảo những chữ ký số đó là hoàn toàn hợp lệ (còn thời hạn sử dụng và đăng ký bằng tên của chính doanh nghiệp)',
      },
      {
        id: 8,
        titleMenu:
          'Để xem được hóa đơn điện tử sau khi tải về máy tính thì tôi phải làm gì?',
        content:
          'Sau khi khách hàng đã tải về hóa đơn điện tử dưới dạng file nén (.zip), khách hàng vui lòng làm theo các bước sau để mở hóa đơn:\n \n- Giải nén file .zip vừa tải về \n \n- Vào thư mục vừa giải nén, kích chuột phải vào file hóa đơn có đuôi .xml \n - Bạn có thể dùng trình duyệt web IE để xem hóa đơn bằng cách: chọn Open with và chọn Internet Explorer (IE), trường hợp IE không hiển thị, thì khách hàng chọn Browse để tìm IE  Ngoài ra, khi sử dụng Einvoices của công ty Thái Sơn cung cấp, trong email mà khách hàng nhận được có đính kèm Hướng dẫn chi tiết cách xem hóa đơn và các văn bản pháp lý liên quan đến hóa đơn điện tử giúp khách hàng khi nhận được hóa đơn điện tử qua email sẽ yên tâm chấp nhận hóa đơn điện tử không còn hoài nghi, thắc mắc. Khách hàng chỉ cần click vào đường dẫn Xem hướng dẫn chi tiết là file Hướng dẫn sẽ được tải về máy, khách hàng mở file vừa tải và làm theo các bước như trong hướng dẫn là có thể xem được hóa đơn',
      },
      {
        id: 9,
        titleMenu:
          'Doanh nghiệp tôi sử dụng Chữ ký số nào để phát hành hóa đơn điện tử?',
        content:
          'Doanh nghiệp sử dụng Chữ ký số đang kê khai thuế hoặc bất kỳ Chữ ký số nào của doanh nghiệp (cùn thông tin Mã số thuế) còn hạn sử dụng và không bị thu hồi để phát hành hóa đơn điện tử',
      },
      {
        id: 10,
        titleMenu:
          'Khi doanh nghiệp tôi thay đổi máy tính làm việc thì có cần thiết lập lại thông tin kết nối hóa đơn điện tử hay không?',
        content:
          'Với mỗi dữ liệu kế toán và trên một máy tính làm việc, việc thiết lạp thông tin kết nối dịch vụ hóa đơn điện tử chỉ cần thực hiện một lần. Khi làm việc trên 1 máy tính khác hoặc với dữ liệu kế toán khác thì doanh nghiệp phải thực hiện thiết lập lại kết nối',
      },
      {
        id: 11,
        titleMenu:
          'Tôi có thể đưa nhiều dữ liệu hóa đơn cùng một thời điểm thay vì nhập từng hóa đơn vào E-Invoice?',
        content:
          'Hiện tại hệ thống E-Invoice có xây dựng chức năng Import Excel hỗ trợ người dùng nhập liệu từ file excel vào hệ thống. Trên file excel, doanh nghiệp cần đưa đầy đủ các thông tin về ngày hóa đơn, số hóa đơn, dòng hàng trên từng hóa đơn… theo cấu hình import để đưa được dữ liệu vào hệ thống Hướng dẫn chi tiết vui lòng xem tại HDSD',
      },
    ],
  },
  {
    id: 4,
    title: 'Cách thức xử lý hóa đơn lập sai',
    data: [
      {
        id: 1,
        titleMenu:
          'Nếu hóa đơn đã xuất và ký số rồi mới phát hiện sai sót thì phải xử lý thế nào?',
        content:
          'Trong trường hợp doanh nghiệp đã lập hóa đơn và ký số thành công mới phát hiện ra sai sót, doanh nghiệp cần đưa ra các biện pháp xử lý thích hợp  - Trường hợp chỉ sai thông tin khách hàng: Nếu phát hiện hóa đơn ghi sai thông tin khách hàng (tên, mã số thuế, địa chỉ), thông tin về dịch vụ, sai lỗi chính tả… thì thực hiện thủ tục điều chỉnh hóa đơn \n+ Lập biên bản điều chỉnh hóa đơn, ghi rõ nội dung sai sót, nội dung điều chỉnh lại cho đúng + Biên bản được lập thành 2 bản (có chữ ký, đóng dấu của bên mua và bên bán hoặc cả 2 bên ký điện tử vào biên bản), mỗi bên lưu trữ 1 bản để cơ quan thuế kiểm tra khi cần. \n- Trường hợp sai thông tin khác  + Trường hợp hóa đơn đã lập và gửi cho người mua, đã giao hàng hóa, cung ứng dịch vụ, người bán và người mua đã kê khai thuế: Nếu phát hiện hóa đơn ghi sai thông tin tiền hàng, mặt hàng thì thực hiện thủ tục điều chỉnh hóa đơn như sau:  \n* Lập biên bản điều chỉnh hóa đơn, ghi rõ nội dung sai sót, số tiền điều chỉnh lại cho đúng (biên bản lập thành hai bản có đầy đủ chữ ký và dấu của hai bên)  \n* Thực hiện chức năng lập HĐĐT điều chỉnh (trên HĐĐT điều chỉnh phải ghi rõ “Điều chỉnh (tăng, giảm) số lượng hàng hóa, giá bán, số tiền, thuế suất, thuế GTGT, tiền thuế GTGT cho HĐĐT số..ký hiệu..ngày tháng năm” \n* Ký số và gửi lại hóa đơn cho khách hàng + Trường hợp hóa đơn đã lập và gửi cho người mua, đã giao hàng hóa, cung ứng dịch vụ, người bán và người mua chưa kê khai thuế: Nếu phát hiện hóa đơn ghi sai các thông tin về khách hàng (tên, mã số thuế, địa chỉ), thông tin về dịch vụ, kỳ cước và số tiền ghi trên hóa đơn…thì thực hiện thủ tục lập hóa đơn thay thế như sau: \n* Lập biên bản thỏa thuận giữa hai bên về việc lập hóa đơn thay thế (bien bản lập thành hai bản có đầy đủ chữ ký và dấu của hai bên) \n* Thực hiện chức năng lập HĐĐT thay thế (trên hóa đơn điện tử mới phải có dòng chữ” Hóa đơn này thay thế hóa đơn số…Ký hiệu, ngày tháng năm”) + Trường hợp hóa đơn đã lập và chưa gửi cho người mua: Nếu phát hiện hóa đơn ghi sai các thông tin về khách hàng (tên, mã số thuế, địa chỉ), thông tin về dịch vụ, kỳ cước và số tiền ghi trên hóa đơn… thì thực hiện xóa bỏ hóa đơn, lập hóa đơn mới cho khách hàng như sau: \n * Lập phiếu giải trình nêu rõ lý do sai phải xóa bỏ hóa đơn  \n* Thực hiện chức năng xóa bỏ HĐĐT đã lập \n* Lập hóa đơn mới, ký số và gửi lại cho khách hàng',
      },
      {
        id: 2,
        titleMenu: ' Khi nào thì lập hóa đơn thay thế, điều chỉnh và xóa bỏ?',
        content:
          '- Hóa đơn xóa bỏ: + Được lập khi hóa đơn chưa được kê khai thuế bởi bên bán hoặc bên mua \n + Được lập khi phát hiện ra hóa đơn lập sai, bên bán muốn xóa bỏ hoàn toàn hóa đơn và lập hóa đơn mới không liên quan đến hóa đơn cũ \n+ Hoặc trường hợp bên mua muốn hủy bỏ dịch vụ, không muốn lấy hóa đơn nữa \n - Hóa đơn thay thế \n+ Được lập khi hóa đơn chưa được kê khai thuế bởi bên bán hoặc bên mua \n+ Được lập khi phát hiện ra hóa đơn lập sai, bên bán muốn lập hóa đơn mới thay cho hóa đơn đã lập sai \n - Hóa đơn điều chỉnh \n+ Được lập khi hóa đơn chưa được kê khai thuế bởi bên bán hoặc bên mua \n+ Được lập khi phát hiện ra hóa đơn lập sai, bên bán muốn lập hóa đơn điều chỉnh thay cho hóa đơn đã lập sai',
      },
    ],
  },
  {
    id: 5,
    title: 'Tích hợp hệ thống',
    data: [
      {
        id: 1,
        titleMenu:
          'Trường hợp tích hợp hệ thống: Sau khi tích hợp giữa 2 hệ thống, nếu dữ liệu từ khách hàng gửi sang E-Invoices bị trùng thì xử lý như thế nào?',
        content:
          '- Nếu dữ liệu trước đó chưa được xuất hóa đơn thì có 3 cách xử lý: \n+ Nhận tiếp dữ liệu và thể hiện là 2 bản ghi có thông tin giống nhau \n+ Lấy thông tin dữ liệu mới nhất ghi đè lên thông tin cũ \n+ Không nhận nữa và hiển thị thông báo dữ liệu đã tồn tại \n- Nếu dữ liệu đã được xuất hóa đơn thì có 2 cách xử lý \n+ Nhận tiếp dữ liệu và thể hiện là 1 bản ghi khác so với bản ghi hiện tại \n+ Không nhận nữa và hiển thị thông báo dữ liệu đã tồn tại và đã được xuất hóa đơn',
      },
    ],
  },
];
export {DATAEINVOICE, DATA};
