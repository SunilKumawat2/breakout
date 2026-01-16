import tsIllus from "@/images/ts-illus.svg";
import Image from "next/image";
import Link from "next/link";

const contactData = [
  {
    name: "M/s. Breakfree Cafe",
    address:
      "unit 304, No.7, Prime Square, 3rd floor, Block 4, Whitefield Main Rd, Bengaluru, Karnataka 560066",
    contact: "9742386781",
  },
  {
    name: "M/s. Escape Ventures",
    address:
      "unit 306, No.7, Prime Square, 3rd floor, Block 4, Whitefield Main Rd, Bengaluru, Karnataka 560066",
    contact: "9742386781",
  },
  {
    name: "M/s. Breakfree Ventures",
    address:
      "unit, 305, No.7, Prime Square, 3rd floor, Block 4, Whitefield Main Rd, Bengaluru, Karnataka 560066",
    contact: "9742386781",
  },
  {
    name: "M/s. Free Thinker Experience",
    address:
      "27, NMR Building, 1st floor, Intermediate Ring Road, 100 Feet Rd, Koramangala, Bengaluru, Karnataka 560047",
    contact: "9742386781",
  },
  {
    name: "M/s. Free Thinker Services",
    address:
      "2nd Floor, No. 13, 6th Cross, 100 Feet Road, Srinivagilu, Bangalore - 560 047",
    contact: "9742386781",
  },
  {
    name: "M/s. Breakout Ventures",
    address:
      "2nd Floor, No 8, 24th Main Rd, 5th Phase, Ayodya Nagar, J P Nagar Phase 5, J. P. Nagar, Bengaluru, Karnataka 560078",
    contact: "9742386781",
  },
  {
    name: "M/s. The Escapist Registered and Managed by its Karta Mothi G. Venkatesan HUF",
    address:
      "27, NMR Building, 2nd floor, Intermediate Ring Road, 100 Feet Rd, Koramangala, Bengaluru, Karnataka 560047",
    contact: "9742386781",
  },
];

const page = () => {
  return (
    <div className="section-padding">
      <div className="black-gr-div">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1 className="sec-head pb-5 medium sm-head mb-5 text-center yellow-text">
                General Enquiries
              </h1>
              <div className="main-con mt-5 para">
                <ol>
                  {contactData.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: "1.5rem" }}>
                      <span>
                        <strong>{item.name}</strong>
                      </span>

                      <p className="mb-0">Address: {item.address}</p>

                      <p>
                        Contact:{" "}
                        <Link href={`tel:${item.contact}`}>{item.contact}</Link>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <Image src={tsIllus} alt="contact" className="w-100 h-auto" />
      </div>
    </div>
  );
};

export default page;
