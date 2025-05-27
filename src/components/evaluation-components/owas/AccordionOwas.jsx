import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../ui/accordion";
import {CircleAlert, CircleCheckBig} from "lucide-react";

export function AccordionOwas(props) {
    return (
        <>
            <Accordion type="multiple" defaultValue={["item-1"]} className="w-full bg-white">

                <Insight key={2}
                         index={2}
                         name="Arms Evaluation"
                         cards={["Los dos brazos bajos",
                             "Un brazo bajo y el otro elevado",
                             "Los dos brazos elevados"]}
                         value={props.result["arms"]["value"]}
                         dictKey={"arms"}
                         confidence={props.result["arms"]["confidence"]}
                         updateResults={props.updateResults}
                />
                <Insight key={3}
                         index={3}
                         name="Back Evaluation"
                         cards={["Espalda recta",
                             "Espalda doblada",
                             "Espalda girada",
                             "Espalda doblada con giro"]}
                         value={props.result["back"]["value"]}
                         dictKey={"back"}
                         confidence={props.result["back"]["confidence"]}
                         updateResults={props.updateResults}
                />
                <Insight key={4}
                         index={4}
                         name="Charge Evaluation"
                         cards={["Carga ligera (menos de 10 kg)",
                             "Carga moderada (10-20 kg)",
                             "Carga pesada (más de 20 kg)"]}
                         value={props.result["load"]["value"]}
                         dictKey={"load"}
                         confidence={props.result["load"]["confidence"]}
                         updateResults={props.updateResults}
                />
                <Insight key={1}
                         index={1}
                         name="Legs Evaluation"
                         cards={[0,
                             "De pie con las dos piernas rectas",
                             "De pie con una pierna recta y la otra flexionada",
                             "De pie o en cuclillas con las dos piernas flexionadas y el peso equilibrado entre ambas",
                             "De pie o en cuclillas con las dos piernas flexionadas y el peso desequilibrado",
                             "Arrodillado",
                             0]}
                         value={props.result["legs"]["value"]}
                         confidence={props.result["legs"]["confidence"]}
                         dictKey={"legs"}
                         updateResults={props.updateResults}
                />
            </Accordion>
        </>
    )
}

export function AccordionReba(props) {
    return (
        <>
            <Accordion type="multiple" defaultValue={["item-1"]} collapsible className="w-full bg-white">
                <Insight index={1}
                         name="Legs Evaluation"
                         value={props.result["legs"]["value"]}
                         confidence={props.result["legs"]["confidence"]}

                />
                <Insight index={2}
                         name="Arms Evaluation"
                         value={props.result["arms"]["value"]}
                         confidence={props.result["arms"]["confidence"]}
                />
                <Insight index={3}
                         name="Back Evaluation"
                         value={props.result["back"]["value"]}
                         confidence={props.result["back"]["confidence"]}
                />
                <Insight index={4}
                         name="Charge Evaluation"
                         value={props.result["load"]["value"]}
                         confidence={props.result["load"]["confidence"]}
                />
            </Accordion>
        </>
    )
}

export function AccordionRula(props) {
    return (
        <>
            <Accordion type="multiple" defaultValue={["item-1"]} collapsible className="w-full bg-white">
                <Insight index={1}
                         name="Legs Evaluation"
                         value={props.result["legs"]["value"]}
                         confidence={props.result["legs"]["confidence"]}
                />
                <Insight index={2}
                         name="Arms Evaluation"
                         value={props.result["arms"]["value"]}
                         confidence={props.result["arms"]["confidence"]}
                />
                <Insight index={3}
                         name="Back Evaluation"
                         value={props.result["back"]["value"]}
                         confidence={props.result["back"]["confidence"]}
                />
                <Insight index={4}
                         name="Charge Evaluation"
                         value={props.result["load"]["value"]}
                         confidence={props.result["load"]["confidence"]}
                />
            </Accordion>
        </>
    )
}

function Insight({index, cards, name, value, confidence, updateResults, dictKey}) {

    const states = {
        0: 'border-2 border-red-500 rounded-2xl',
        1: 'border-2 border-yellow-500 rounded-2xl',
        2: 'border-2 border-green-500 rounded-2xl',
    }

    return (
        // añade el value con props.index
        <AccordionItem value={`item-${index}`} className="bg-white">
            <AccordionTrigger className="p-5">
                {name}
                <span className={"grow"}></span>
                <div className="transform -translate-x-1/2">
                    {(confidence === 2 || confidence === null) &&
                        <CircleCheckBig color={"#2caf3b"}/>
                    }
                    {(confidence === 1) &&
                        <CircleAlert color={"#f7b500"}/>
                    }
                    {(confidence === 0) &&
                        <CircleAlert color={"#f70000"}/>
                    }
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="flex flex-wrap justify-around">
                    {cards.map((card, index ) => (
                        card !== 0 ? (
                        <>
                            {/*<Card*/}
                            {/*    */}
                            {/*    title={card}*/}
                            {/*    image=*/}
                            {/*    // isActive={activeCardIndex === props.cards.indexOf(card)}*/}
                            {/*    confidence={value === cards.indexOf(card) + 1 ? confidence : ""}*/}
                            {/*    onClick={() => updateResults(dictKey, cards.indexOf(card) + 1)}*/}
                            {/*    // onClick={() => handleCardClick(props.cards.indexOf(card) + 1)}*/}
                            {/*/>*/}
                            <button key={index} onClick={() => updateResults(dictKey, cards.indexOf(card) + 1)}
                                    className={`my-2 ${value === index + 1 ? states[confidence] : ""} flex flex-col grow  items-center justify-between w-full sm:w-1/3 md:w-1/4`}>
                                <h1 className="flex-grow flex items-center justify-center text-center mx-2">{card}</h1>
                                <img className="h-[100px] object-contain" src={"/assets/Card-image.png"} alt={card}/>
                            </button>
                        </>
                    ): null ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}