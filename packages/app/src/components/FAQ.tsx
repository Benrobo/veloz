"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowStart,
  FlexRowStartBtw,
} from "@/components/Flex";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

// FAQ DATA
const boldText = (text: string) => {
  return `<span class='text-white-100 font-ppSB'>${text}</span>`;
};

const FAQ_DATA = [
  {
    key: "1",
    question: "What is Veloz?",
    answer: [
      `Veloz is a suit of starter kits / pre-built templates which enable you build and launch your next side-hustle faster.`,
      `Veloz starter kit allows you kickstart your project with a pre-built kit. It comes with a pre-built UI, backend and database. You can customize the kit to suit your needs.`,
    ],
  },
  {
    key: "2",
    question: "What is included?",
    answer: [
      `As a developer, you get access to the source code of the starter kit. You can customize the kit to suit your needs.`,
      `I believe not every SaaS are built with nextjs which is why veloz offer flexibility by providing you with starter kits built with different tech stacks.`,
    ],
  },
  {
    key: "3",
    question: "What do i get after purchase?",
    answer: [
      `Once you've purchased one of veloz starter kit, you dont just get one kit, but any prebuilt related kit for that main kit which was purchased.`,
      `For eg, If I purchase Zeus, I get access to zeus-1.0, zeus-2.0 ..etc which can be different variants of zeus (Nextjs)`,
      `You get access to the documentation and prebuilt UI components which is protected by default and can only be used if you're one of veloz customers.`,
    ],
  },
  {
    key: "4",
    question: "Do you offer support?",
    answer: [
      `${boldText(
        "Yes"
      )}, Every veloz customer gets access to our discord community where you can ask questions and get help from other veloz customers and the veloz team.`,
    ],
  },
  {
    key: "6",
    question: "Do i need to be an expert to use Veloz-kit?",
    answer: [
      `${boldText(
        "No"
      )}, Even your younger brother (who once struggled to operate a toaster) can conquer Veloz-Kit! 🚀 Veloz-Kit was created with simplicity in mind—no rocket science required.`,
      `It so user-friendly that it feels like cheating. You can easily customize the kit to suit your needs.`,
    ],
  },
  {
    key: "7",
    question: "My tech stack is not supported, what do i do?",
    answer: [
      `Veloz isn't limited to one tech stack, from the landing page feature section, you get to see the different tech stacks we plan to support in future. But for now, Nextjs is the only supported tech stack. More tech stacks will be added in future.`,
    ],
  },
  {
    key: "8",
    question: "Why Typescript and not Javascript?",
    answer: [
      `We prefer TypeScript over plain JavaScript because it makes coding easier, provides a better developer experience, and helps prevent bugs in your code.`,
    ],
  },
  {
    key: "9",
    question: "Can I get a refund?",
    answer: [
      `Due to the nature of the product, ${boldText(
        "we do not offer refunds"
      )} . After purchase, you get access to the source code and repo which is why we do not offer refunds.`,
      `However, Feel free to reach out with any questions about the product! Whether you're looking for coding snippets or a product workthrough, I'm here to help.`,
    ],
  },
  {
    key: "10",
    question: "Can I Open Source my project?",
    answer: [
      `Please bear in mind that the value of our kits lies in their ${boldText(
        "exclusivity"
      )}. i.e it wont be of any value if they were published or made opensource.`,
      "Kindly refrain from sharing your project's codebase beyond your organization.",
    ],
  },
  {
    key: "11",
    question: "How often is Veloz-kit updated?",
    answer: [
      `In short, ${boldText(
        "FOREVER"
      )} .. I continually ship products and updates, as a result there would always be a room of improvement. I'm always looking for ways to improve the product and make it better for you.`,
    ],
  },
];

function FAQ() {
  return (
    <FlexColCenter className="relative w-full h-auto border-t-[1px] border-t-white-600 py-9 pb-9 mb-8">
      <div id={"faq"} className="absolute -top-12"></div>
      <h1 className="text-[1em] md:text-3xl font-ppSB text-white-100">
        Frequently Asked Questions
      </h1>
      <br />
      <FlexColCenter className="w-full h-auto max-w-[95%] md:max-w-[75%] mx-auto">
        <FlexColStart className="w-full border-[.5px] border-white-300/20 rounded-md">
          {FAQ_DATA.map((f, i) => (
            <FAQDropdown
              key={Math.random() * 10e2}
              _key={i}
              question={f.question}
              answer={f.answer}
            />
          ))}
        </FlexColStart>
      </FlexColCenter>
    </FlexColCenter>
  );
}

export default FAQ;

type FAQDropdownProps = {
  question: string;
  answer: string[];
  _key: any;
};

function FAQDropdown({ question, answer, _key }: FAQDropdownProps) {
  const [activeFaq, setActiveFaq] = React.useState<string[]>([]);

  return (
    <FlexColStart className="w-full" key={Math.random() * 10e4}>
      <FlexColStart className="w-full border-b-[1px] border-b-white-600">
        <button
          className="w-full px-8 py-4"
          onClick={() => {
            if (activeFaq.includes(_key)) {
              setActiveFaq(activeFaq.filter((d) => d !== _key));
            } else {
              setActiveFaq([...activeFaq, _key]);
            }
          }}
        >
          <FlexRowStartBtw>
            <span className="text-sm md:text-md text-white-100 font-ppSB text-md text-start">
              {question}
            </span>
            {activeFaq.includes(_key) ? (
              <ChevronUp size={15} className="text-white-200" />
            ) : (
              <ChevronDown size={15} className="text-white-200" />
            )}
          </FlexRowStartBtw>
        </button>
        {/* answer */}
        <FlexColStart
          className={cn(
            "w-full h-auto px-8 overflow-hidden transition-all",
            activeFaq.includes(_key) ? "h-auto py-4" : "h-0"
          )}
        >
          {answer.map((a, i) => (
            <span
              key={i}
              className="text-white-300 text-[12px] font-ppReg md:text-sm"
              dangerouslySetInnerHTML={{ __html: a }}
            ></span>
          ))}
        </FlexColStart>
      </FlexColStart>
    </FlexColStart>
  );
}
