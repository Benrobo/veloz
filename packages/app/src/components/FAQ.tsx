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
const FAQ_DATA = [
  {
    key: "faq1",
    question: "What is a good way to learn React?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    key: "faq2",
    question: "How can I get access to the API docs?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    key: "faq3",
    question: "Is there any free trial period for the PRO version?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    key: "faq4",
    question: "Can I use Landrick for my clients?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
  {
    key: "faq5",
    question: "Do you have a money back guarantee?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  },
];

function FAQ() {
  return (
    <FlexColCenter className="relative w-full h-full border-t-[1px] border-t-white-600 py-9 pb-9 mb-8">
      <div id={"faq"} className="absolute -top-12"></div>
      <h1 className="text-[1em] md:text-3xl font-ppSB text-white-100">
        Frequently Asked Questions
      </h1>
      <br />
      <FlexColCenter className="w-full max-w-[95%] md:max-w-[75%] mx-auto">
        <FlexColStart className="w-full border-[.5px] border-white-300/20 rounded-md">
          {FAQ_DATA.map((f, i) => (
            <FAQDropdown
              key={f.key}
              _key={f.key}
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
  answer: string;
  _key: string;
};

function FAQDropdown({ question, answer, _key }: FAQDropdownProps) {
  const [activeFaq, setActiveFaq] = React.useState<string[]>([]);

  return (
    <FlexColStart className="w-full">
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
            <span className="text-xs md:text-md text-white-100 font-ppReg text-md text-start">
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
          <span className="text-white-300 text-[12px] font-ppL md:text-sm">
            {answer}
          </span>
        </FlexColStart>
      </FlexColStart>
    </FlexColStart>
  );
}
