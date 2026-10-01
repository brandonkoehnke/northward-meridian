import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import { InformationCard } from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import NegativeEquityTradeInCheck from "./NegativeEquityTradeInCheck";

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl =
    `${siteUrl}/es/guides/que-pasa-si-debo-mas-de-lo-que-vale-mi-carro`;

const guideSections = [
    { id: "negative-equity-trade-in-check", label: "Calculadora" },
    { id: "short-answer", label: "La respuesta corta" },
    { id: "what-it-is", label: "Qué es el valor neto negativo" },
    { id: "how-to-calculate", label: "Cómo se calcula" },
    { id: "trade-in", label: "Qué pasa con el canje" },
    { id: "new-loan", label: "Cómo afecta al nuevo préstamo" },
    { id: "term", label: "Por qué importa el plazo" },
    { id: "down-payment", label: "Qué pasa con el pago inicial" },
    { id: "ltv", label: "Relación préstamo-valor" },
    { id: "before-signing", label: "Qué revisar antes de firmar" },
    { id: "options", label: "Qué opciones tiene" },
    { id: "questions", label: "Preguntas para el concesionario" },
    { id: "takeaways", label: "Puntos clave" },
] as const;

const guidedEntryScenarios = [
    {
        id: "calculate",
        title: "Estoy por entregar mi carro y no sé si debo más de lo que vale.",
        summary:
            "Calcule su valor neto y vea cómo podría afectar el próximo préstamo.",
        guidance:
            "Empiece con la calculadora. Use el monto de liquidación de su prestamista y una estimación razonable del valor de canje.",
        destinationId: "negative-equity-trade-in-check",
        destinationLabel: "Calculadora",
    },
    {
        id: "dealer",
        title: "El concesionario dice que va a pagar mi préstamo anterior.",
        summary:
            "Vea cómo comprobar qué ocurre con la diferencia en los documentos.",
        guidance:
            "Revise el saldo para liquidar, el valor de canje, el pago inicial y el monto financiado. Que el concesionario pague el préstamo no significa que la diferencia desaparezca sin costo.",
        destinationId: "trade-in",
        destinationLabel: "Qué pasa con el canje",
    },
    {
        id: "payment",
        title: "Quiero saber cuánto podría aumentar mi pago mensual.",
        summary:
            "Compare el préstamo nuevo con y sin la deuda anterior.",
        guidance:
            "Use la tasa y el plazo que le ofrecen. La calculadora separa el efecto del saldo anterior del costo del carro nuevo.",
        destinationId: "new-loan",
        destinationLabel: "El nuevo préstamo",
    },
] as const;

export const metadata: Metadata = {
    title:
        "¿Qué pasa si debo más de lo que vale mi carro? | Northward Meridian",
    description:
        "Entienda el valor neto negativo antes de entregar su carro como parte de pago y vea cómo una deuda anterior puede cambiar el monto financiado, el pago mensual y el interés total del próximo préstamo.",
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        type: "article",
        url: canonicalUrl,
        siteName: "Northward Meridian",
        title:
            "¿Qué pasa si debo más de lo que vale mi carro?",
        description:
            "Guía en español sobre valor neto negativo, canjes y financiamiento de automóviles.",
        locale: "es_US",
        publishedTime: "2026-10-01",
        modifiedTime: "2026-10-01",
    },
    twitter: {
        card: "summary",
        title:
            "¿Qué pasa si debo más de lo que vale mi carro?",
        description:
            "Entienda el valor neto negativo y use la calculadora para revisar el efecto en su próximo préstamo.",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¿Qué pasa si debo más de lo que vale mi carro?",
    description:
        "Guía en español sobre valor neto negativo al entregar un carro como parte de pago y su efecto en un nuevo préstamo.",
    inLanguage: "es-US",
    datePublished: "2026-10-01",
    dateModified: "2026-10-01",
    mainEntityOfPage: canonicalUrl,
    author: {
        "@type": "Organization",
        name: "Northward Meridian",
        url: `${siteUrl}/about`,
    },
    publisher: {
        "@type": "Organization",
        name: "Northward Meridian",
        url: siteUrl,
    },
};

export default function SpanishNegativeEquityGuide() {
    return (
        <GuideLayout
            locale="es"
            category="Automóviles"
            title="¿Qué pasa si debo más de lo que vale mi carro?"
            description="Entienda el valor neto negativo antes de entregar su carro como parte de pago y vea cómo una deuda anterior puede cambiar el costo del próximo préstamo."
            updated="Octubre 2026"
            readingTime="12 min"
            recommendedFor="Personas que deben dinero por su carro actual y están considerando entregarlo como parte de pago."
            bottomLine="Si debe más por su carro de lo que vale, la diferencia no desaparece al entregarlo. Puede tener que pagarla en efectivo, cubrirla con parte del pago inicial o incorporarla al nuevo préstamo."
            sections={guideSections}
            structuredData={articleJsonLd}
            guidedEntry={
                <GuidedEntry
                    locale="es"
                    scenarios={guidedEntryScenarios}
                />
            }
        >
            <NegativeEquityTradeInCheck />

            <WhyThisMatters locale="es" id="short-answer">
                <p>
                    Si el monto necesario para liquidar su préstamo actual es
                    mayor que el valor que le ofrecen por su carro, tiene
                    <strong> valor neto negativo</strong>. Por ejemplo, si
                    necesita $28,000 para liquidar el préstamo y el carro vale
                    $23,000 como parte de pago, la diferencia es de $5,000.
                </p>
                <p>
                    Esa diferencia debe resolverse de alguna manera si quiere
                    completar el canje. Puede pagarla por separado, aportar
                    dinero en efectivo, usar parte del pago inicial para
                    cubrirla o incorporarla al nuevo financiamiento.
                </p>
            </WhyThisMatters>

            <GuideSection
                locale="es"
                id="what-it-is"
                eyebrow="Concepto"
                title="Qué es el valor neto negativo"
            >
                <p>
                    El valor neto negativo ocurre cuando usted debe más por el
                    préstamo de su carro actual de lo que vale el vehículo.
                </p>
                <InformationCard title="La cuenta básica">
                    <p>
                        <strong>
                            Valor neto = valor de canje − monto para liquidar el
                            préstamo.
                        </strong>
                    </p>
                    <p className="mt-3">
                        Si el resultado es negativo, la diferencia es su valor
                        neto negativo.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="how-to-calculate"
                eyebrow="Cálculo"
                title="Use el monto de liquidación real y un valor de canje razonable."
            >
                <p>
                    Use el monto que su prestamista exige para liquidar el
                    préstamo, no necesariamente el saldo que aparece en su
                    estado de cuenta. Cuando sea posible, pida el monto de
                    liquidación directamente al prestamista.
                </p>
                <p>
                    Después estime el valor de canje del carro. Puede comparar
                    varias ofertas para entender si el valor que le presenta
                    el concesionario es razonable.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="trade-in"
                eyebrow="Canje"
                title="El concesionario puede manejar la diferencia de varias maneras."
            >
                <p>
                    Un concesionario puede ofrecer pagar el saldo del carro
                    anterior, pero eso no significa necesariamente que la deuda
                    desaparezca sin costo para usted. El valor neto negativo
                    puede incorporarse al nuevo préstamo o compensarse con
                    parte del pago inicial.
                </p>
                <InformationCard title="Revise qué está ocurriendo realmente">
                    <p>
                        Compare el saldo de liquidación, el valor de canje, el
                        pago inicial y el monto financiado en la documentación.
                        No se limite al pago mensual.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="new-loan"
                eyebrow="Financiamiento"
                title="Incorporar la deuda anterior aumenta el monto que financia."
            >
                <p>
                    Si tiene $5,000 de valor neto negativo y los incorpora al
                    próximo préstamo, el préstamo nuevo necesita cubrir $5,000
                    adicionales antes de considerar los intereses de esa parte
                    de la deuda.
                </p>
                <p>
                    La calculadora muestra el efecto sobre el monto financiado,
                    el pago mensual, el interés total y los pagos totales usando
                    la tasa y el plazo que usted ingrese.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="term"
                eyebrow="Plazo"
                title="Un plazo más largo puede reducir el pago mensual, pero aumenta el tiempo que paga intereses."
            >
                <p>
                    Un plazo más largo puede reducir el pago mensual, pero
                    normalmente aumenta el interés pagado durante la vida del
                    préstamo. También puede prolongar el período en el que el
                    vehículo tiene valor neto negativo.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="down-payment"
                eyebrow="Pago inicial"
                title="El pago inicial puede reducir lo que necesita financiar, pero no borra un saldo anterior por sí solo."
            >
                <p>
                    Si todavía debe dinero por el carro que entrega, parte del
                    efectivo que aporta puede utilizarse para cubrir ese saldo.
                    El pago inicial puede consistir en efectivo, el valor neto de
                    un canje o ambos.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="ltv"
                eyebrow="Relación préstamo-valor"
                title="El LTV muestra qué proporción del valor del vehículo está financiando."
            >
                <p>
                    La relación préstamo-valor, o LTV, es el monto del préstamo
                    dividido por el valor del vehículo. Un porcentaje superior
                    al 100% significa que el monto financiado supera ese valor.
                </p>
                <InformationCard title="No confunda LTV con una calificación">
                    <p>
                        El LTV es una medida descriptiva. La calculadora lo
                        muestra para que pueda ver cómo cambia el monto
                        financiado en relación con el precio del vehículo nuevo.
                    </p>
                </InformationCard>
            </GuideSection>

            <DecisionChecklist
                locale="es"
                id="before-signing"
                title="Antes de firmar"
                items={[
                    "Confirme el monto exacto para liquidar su préstamo actual.",
                    "Revise el valor de canje que aparece en la documentación.",
                    "Compare el monto financiado antes y después de incluir el carro anterior.",
                    "Revise el APR y el plazo del nuevo préstamo.",
                    "Verifique cómo se está manejando cualquier valor neto negativo.",
                    "Revise cualquier producto o cargo adicional incluido en el monto financiado.",
                    "Compare el costo total y no solamente el pago mensual.",
                ]}
            />

            <GuideSection
                locale="es"
                id="options"
                eyebrow="Opciones"
                title="También puede esperar o vender el carro por su cuenta."
            >
                <p>
                    Si tiene valor neto negativo, puede considerar esperar,
                    pagar más rápidamente el préstamo o investigar cuánto podría
                    obtener vendiendo el carro por su cuenta.
                </p>
                <p>
                    Ninguna de estas opciones es automáticamente mejor. La
                    comparación depende de cuánto debe, cuánto vale el carro,
                    cuánto necesita el vehículo nuevo y qué términos de
                    financiamiento puede obtener.
                </p>
            </GuideSection>

            <QuestionsToAsk
                locale="es"
                id="questions"
                title="Preguntas para el concesionario o prestamista"
                subtitle="Lleve estas preguntas antes de firmar la documentación."
                questions={[
                    "¿Cuál es exactamente el monto para liquidar mi préstamo actual?",
                    "¿Qué valor de canje aparece por mi carro?",
                    "¿Qué ocurre con la diferencia entre esos dos números?",
                    "¿Se está incorporando alguna parte de mi saldo anterior al nuevo préstamo?",
                    "¿Cuál es el monto financiado antes y después de incluir el carro anterior?",
                    "¿Cuál es el APR y cuál es el plazo del nuevo préstamo?",
                    "¿Qué productos o cargos adicionales están incluidos en el monto financiado?",
                    "¿Dónde aparece cada uno de estos valores en el contrato?",
                ]}
            />

            <KeyTakeaways
                locale="es"
                id="takeaways"
                items={[
                    "El valor neto negativo es la diferencia entre lo que necesita para liquidar su préstamo y lo que vale su carro.",
                    "Entregar el carro no hace desaparecer una deuda superior a su valor.",
                    "Si la diferencia se incorpora al préstamo nuevo, usted financia esa deuda y puede pagar intereses sobre ella.",
                    "Compare el monto financiado y el costo total, no solo el pago mensual.",
                    "Use el monto de liquidación real y un valor de canje razonable.",
                    "Revise los documentos antes de firmar para confirmar cómo se está manejando el saldo anterior.",
                ]}
            />

            <Sources
                locale="es"
                sources={[
                    {
                        title: "Canje de carros y valor neto negativo",
                        publisher: "Comisión Federal de Comercio",
                        href: "https://consumidor.ftc.gov/articulos/canje-de-carros-y-valor-neto-negativo-cuando-debe-mas-de-lo-que-vale-su-carro",
                    },
                    {
                        title: "Cómo financiar un carro o adquirirlo en la modalidad de leasing",
                        publisher: "Comisión Federal de Comercio",
                        href: "https://consumidor.ftc.gov/articulos/como-financiar-un-carro-o-adquirirlo-en-la-modalidad-de-leasing",
                    },
                    {
                        title: "¿Cómo afecta el pago inicial a mi préstamo para automóvil?",
                        publisher: "CFPB",
                        href: "https://www.consumerfinance.gov/es/obtener-respuestas/como-afecta-el-pago-inicial-a-mi-prestamo-para-automovil-es-773/",
                    },
                    {
                        title: "Glosario español-inglés de términos financieros",
                        publisher: "CFPB",
                        href: "https://files.consumerfinance.gov/f/documents/cfpb_adult-fin-ed_spanish-style-guide-glossary.pdf",
                    },
                ]}
            />
        </GuideLayout>
    );
}
