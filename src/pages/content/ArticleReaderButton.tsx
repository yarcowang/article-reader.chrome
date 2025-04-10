import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";

interface ArticleReaderButtonProps {
  nodes: NodeListOf<HTMLElement>;
}

const ArticleReaderButton: React.FC<ArticleReaderButtonProps> = (props) => {
  const [reading, setReading] = React.useState(false);
  const [paras, setParas] = React.useState<string[]>([]);
  const [n, setN] = React.useState(0);
  const [lang, setLang] = React.useState("");

  const toggleReading = async () => {
    if (!reading) {
        if (true) { // read all
            const content = paras.join('\n');
            chrome.runtime.sendMessage({ action: 'read', lang, content });
        } else {
            const content = paras[n];
            chrome.runtime.sendMessage({ action: 'read', lang, content });
            setN(n + 1);
        }
      const content = paras[n];
      chrome.runtime.sendMessage({ action: 'read', lang, content });
      setN(n + 1);
    } else {
      chrome.runtime.sendMessage({ action: 'stop' }); 
    }

    setReading(!reading);
  };

  useEffect(() => {
    // finish reading
    chrome.runtime.onMessage.addListener((request) => {
        if (request.action === "finished_reading") {
          setReading(false);
        }
    })

    let paras: string[] = [];

    props.nodes.forEach((node) => {
      const text = node.innerText;

      if (lang === "") {
        chrome.i18n.detectLanguage(text, (r) => {
          if (r.isReliable) {
            setLang(r.languages[0].language);
          } else {
            // fallback to english
            setLang("en");
          }
        });
      }

      if (text) {
        paras = paras.concat(text.split("\n"));
      }
    });

    setParas(paras);


  }, []);

  return (
    <>
      {props.nodes.length > 0 && (
        <div
          id="article-reader-container"
          className="fixed right-0 top-1/2 transform -translate-y-1/2 isolate"
        >
          <button
            id="my-floating-button"
            className="bg-[#FF7900] hover:bg-[#FF8F00] text-white text-base! font-bold! py-2! px-3! rounded-l-full shadow-lg transition-colors duration-200"
            onClick={toggleReading}
          >
            {reading ? (
              <ChatBubbleBottomCenterTextIcon className="inline-block! mx-1! size-6 text-white" />
            ) : (
              <ChatBubbleBottomCenterIcon className="inline-block! mx-1! size-6 text-white" />
            )}
            Reader It!
          </button>
        </div>
      )}
    </>
  );
};

export default ArticleReaderButton;
