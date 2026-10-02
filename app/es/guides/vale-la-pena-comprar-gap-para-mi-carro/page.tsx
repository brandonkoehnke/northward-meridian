import type { Metadata } from "next";

import DecisionChecklist from "@/app/components/article/DecisionChecklist";
import GuideLayout from "@/app/components/article/GuideLayout";
import GuideSection from "@/app/components/article/GuideSection";
import GuidedEntry from "@/app/components/article/GuidedEntry";
import { InformationCard } from "@/app/components/article/GuidePrimitives";
import KeyTakeaways from "@/app/components/article/KeyTakeaways";
import QuestionsToAsk from "@/app/components/article/QuestionsToAsk";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";
import Sources from "@/app/components/article/Sources";
import WhyThisMatters from "@/app/components/article/WhyThisMatters";
import GAPValueCheck from "./GAPValueCheck";

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl =
    `${siteUrl}/es/guides/vale-la-pena-comprar-gap-para-mi-carro`;

const guideSections = [
    { id: "gap-value-check", label: "Calculadora" },
    { id: "short-answer", label: "La respuesta corta" },
    { id: "what-gap-does", label: "Qué hace GAP" },
    { id: "gap-exposure", label: "Cuánto podría deber" },
    { id: "when-gap-matters", label: "Cuándo puede importar más" },
    { id: "what-gap-does-not-cover", label: "Qué GAP no cubre" },
    { id: "cost", label: "Cuánto cuesta" },
    { id: "compare", label: "Dónde comprarlo" },
    { id: "contract", label: "Qué revisar en el contrato" },
    { id: "before-buying", label: "Antes de comprar" },
    { id: "questions", label: "Preguntas para GAP" },
    { id: "takeaways", label: "Puntos clave" },
] as const;

const guidedEntryScenarios = [
    {
        id: "negative-equity",
        title: "Debo más por mi carro de lo que vale.",
        summary:
            "Primero determine si existe una diferencia que GAP podría cubrir en una pérdida total.",
        guidance:
            "Use el saldo para liquidar y el pago que estima que recibiría del seguro. La diferencia es una aproximación de su exposición antes de los términos específicos de GAP.",
        destinationId: "gap-exposure",
        destinationLabel: "Su exposición",
    },
    {
        id: "dealer-offer",
        title: "El concesionario me está ofreciendo GAP.",
        summary:
            "Compare el precio del producto antes de aceptar que se incorpore al préstamo.",
        guidance:
            "Pida el precio por separado y compárelo con otras opciones. Si lo financia, calcule también cuánto interés pagará por el producto.",
        destinationId: "compare",
        destinationLabel: "Comparar opciones",
    },
    {
        id: "already-covered",
        title: "No sé si ya tengo algo parecido.",
        summary:
            "Revise su seguro, contrato de financiamiento y cualquier cobertura existente antes de comprar.",
        guidance:
            "GAP no sustituye el seguro de automóvil. Compruebe qué paga su póliza en una pérdida total y si ya existe una cobertura o disposición que reduzca la diferencia.",
        destinationId: "contract",
        destinationLabel: "Qué revisar",
    },
] as const;

export const metadata: Metadata = {
    title:
        "¿Vale la pena comprar GAP para mi carro? | Northward Meridian",
    description:
        "Entienda qué cubre GAP, estime su posible exposición si su carro queda en pérdida total y compare el costo de la cobertura con el riesgo que enfrenta.",
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        type: "article",
        url: canonicalUrl,
        siteName: "Northward Meridian",
        title:
            "¿Vale la pena comprar GAP para mi carro?",
        description:
            "Guía en español sobre GAP, valor del vehículo, saldo del préstamo y costo de la cobertura.",
        locale: "es_US",
        publishedTime: "2026-10-02",
        modifiedTime: "2026-10-02",
    },
    twitter: {
        card: "summary",
        title:
            "¿Vale la pena comprar GAP para mi carro?",
        description:
            "Estime su posible exposición y compare el costo de GAP con su situación.",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "¿Vale la pena comprar GAP para mi carro?",
    description:
        "Guía en español sobre GAP, exposición del préstamo y costo de la cobertura.",
    inLanguage: "es-US",
    datePublished: "2026-10-02",
    dateModified: "2026-10-02",
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

export default function SpanishGAPGuide() {
    return (
        <GuideLayout
            locale="es"
            category="Automóviles"
            title="¿Vale la pena comprar GAP para mi carro?"
            description="Entienda qué cubre GAP, estime su posible exposición si su carro queda en pérdida total y compare el costo de la cobertura con el riesgo que enfrenta."
            updated="Octubre 2026"
            readingTime="13 min"
            recommendedFor="Personas que están financiando o considerando financiar un carro y quieren saber si GAP podría protegerlas frente a una deuda superior al valor del vehículo."
            bottomLine="GAP es un producto opcional que puede cubrir parte o toda la diferencia entre lo que todavía debe por el carro y lo que paga el seguro después de una pérdida cubierta, según los términos del contrato. Su valor depende de la exposición que tenga, el precio de la cobertura y las condiciones específicas del producto."
            sections={guideSections}
            structuredData={articleJsonLd}
            guidedEntry={
                <GuidedEntry
                    locale="es"
                    scenarios={guidedEntryScenarios}
                />
            }
        >
            <GAPValueCheck />

            <WhyThisMatters locale="es" id="short-answer">
                <p>
                    GAP está diseñado para cubrir una diferencia que puede
                    aparecer cuando el saldo de un préstamo de automóvil es
                    mayor que lo que paga el seguro si el vehículo es robado o
                    declarado pérdida total, sujeto a los términos del producto.
                </p>
                <p>
                    El seguro de automóvil y GAP cumplen funciones distintas:
                    el seguro determina el pago por el vehículo según la póliza,
                    mientras que GAP puede abordar la diferencia entre ese pago
                    y la deuda cubierta.
                </p>
            </WhyThisMatters>

            <GuideSection
                locale="es"
                id="what-gap-does"
                eyebrow="Concepto"
                title="GAP aborda una diferencia entre la deuda y el pago del seguro."
            >
                <p>
                    En una pérdida total, la aseguradora normalmente calcula el
                    valor del vehículo según los términos de su póliza. Si el
                    saldo que todavía debe al prestamista es mayor que ese pago,
                    puede quedar una diferencia.
                </p>
                <InformationCard title="La cuenta básica">
                    <p>
                        <strong>
                            Exposición aproximada = saldo para liquidar − pago
                            estimado del seguro.
                        </strong>
                    </p>
                    <p className="mt-3">
                        Si el resultado es positivo, existe una diferencia
                        potencial que podría ser relevante para una cobertura
                        GAP. El contrato puede limitar qué parte de esa
                        diferencia cubre.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="gap-exposure"
                eyebrow="Exposición"
                title="Primero calcule cuánto podría quedar pendiente."
            >
                <p>
                    Use el monto real para liquidar el préstamo y una estimación
                    razonable del pago del seguro después del deducible. No use
                    simplemente el precio que pagó por el carro como sustituto
                    del valor que determinaría una reclamación.
                </p>
                <p>
                    La diferencia cambia con el tiempo. El saldo del préstamo
                    puede bajar mientras el vehículo también pierde valor. Un
                    pago inicial pequeño, deuda anterior incorporada al préstamo
                    y un plazo largo pueden aumentar la posibilidad de que el
                    saldo supere el valor del vehículo durante una parte del
                    préstamo.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="when-gap-matters"
                eyebrow="Situación"
                title="La exposición puede ser mayor al principio del préstamo."
            >
                <p>
                    GAP resulta más relevante cuando existe una diferencia
                    significativa entre la deuda y el valor que tendría el
                    vehículo en una pérdida total. La cantidad puede cambiar
                    después de una compra, refinanciación, pago adicional o
                    amortización normal del préstamo.
                </p>
                <InformationCard title="Factores que conviene revisar">
                    <p>
                        Considere el pago inicial, cualquier valor neto negativo
                        que haya incorporado, el plazo del préstamo, la tasa,
                        cuánto ha bajado el saldo y cuánto podría pagar el seguro
                        por el vehículo si ocurriera una pérdida total.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="what-gap-does-not-cover"
                eyebrow="Cobertura"
                title="GAP no significa que cualquier saldo restante será pagado."
            >
                <p>
                    Los contratos de GAP pueden tener límites, exclusiones,
                    requisitos de elegibilidad y reglas diferentes sobre
                    deducibles, pagos atrasados, cargos u otros conceptos.
                </p>
                <p>
                    Lea el contrato específico. Una calculadora puede mostrar
                    una exposición matemática, pero no puede determinar cuánto
                    pagaría un proveedor de GAP bajo un contrato concreto.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="cost"
                eyebrow="Costo"
                title="El precio de GAP también forma parte de la decisión."
            >
                <p>
                    El precio puede variar según el proveedor y las condiciones
                    de la cobertura. Si el costo se incorpora al préstamo, usted
                    también puede pagar intereses sobre ese producto durante el
                    plazo del préstamo.
                </p>
                <p>
                    Compare el precio total, no solamente cuánto agrega al pago
                    mensual. La calculadora de esta guía separa el costo del
                    producto de la exposición potencial para que pueda evaluar
                    ambos lados de la decisión.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="compare"
                eyebrow="Comparación"
                title="No tiene que aceptar automáticamente el GAP del concesionario."
            >
                <p>
                    GAP puede ofrecerse a través del concesionario, prestamista
                    u otros proveedores. Compare tanto el precio como las
                    condiciones de la cobertura antes de comprar.
                </p>
                <p>
                    Pregunte si su aseguradora ya ofrece una opción relacionada,
                    si su prestamista ofrece GAP y si las alternativas tienen
                    límites o condiciones diferentes. Un precio menor no sirve de
                    mucho si la cobertura tampoco es comparable.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="contract"
                eyebrow="Contrato"
                title="Lea exactamente qué cubre y qué excluye."
            >
                <p>
                    Busque la definición de pérdida total, el método para
                    determinar la deuda cubierta, los límites del beneficio, los
                    deducibles, exclusiones, requisitos de elegibilidad y las
                    reglas para cancelar la cobertura.
                </p>
                <p>
                    También revise qué ocurre si vende, refinancia o paga el
                    préstamo antes de tiempo. Algunos productos pueden permitir
                    un reembolso parcial cuando terminan antes del plazo
                    original, dependiendo de sus términos.
                </p>
            </GuideSection>

            <DecisionChecklist
                locale="es"
                id="before-buying"
                title="Antes de comprar GAP"
                items={[
                    "Obtenga el monto exacto para liquidar el préstamo.",
                    "Estime cuánto podría pagar el seguro por el vehículo en una pérdida total.",
                    "Calcule la diferencia entre esos dos montos.",
                    "Pida el precio de GAP por separado.",
                    "Compare la cobertura y el precio con otras opciones disponibles.",
                    "Revise límites, exclusiones, deducibles y requisitos de elegibilidad.",
                    "Pregunte qué ocurre si vende, refinancia o paga el préstamo antes de tiempo.",
                    "Si financia GAP, calcule también el interés que pagará sobre el producto.",
                    "Lea el contrato final antes de aceptar la cobertura.",
                ]}
            />

            <QuestionsToAsk
                locale="es"
                id="questions"
                title="Preguntas antes de comprar GAP"
                subtitle="Pida respuestas claras y revise la documentación antes de aceptar la cobertura."
                questions={[
                    "¿Cuál es el precio total de GAP?",
                    "¿Qué diferencia cubre exactamente?",
                    "¿Cuál es el límite máximo del beneficio?",
                    "¿Hay exclusiones o requisitos de elegibilidad que puedan impedir un pago?",
                    "¿Cómo se calcula el monto de la deuda cubierta?",
                    "¿Qué ocurre si ya tengo una cobertura similar?",
                    "¿Puedo comprar GAP de otro proveedor?",
                    "¿Qué pasa si vendo, refinancio o pago el préstamo antes de tiempo?",
                    "¿Puedo cancelar GAP y, si es así, cómo funciona el reembolso?",
                    "¿Dónde aparece el producto y su precio en el contrato?",
                ]}
            />

            <KeyTakeaways
                locale="es"
                id="takeaways"
                items={[
                    "GAP puede cubrir parte o toda la diferencia entre una deuda de auto y el pago del seguro después de una pérdida cubierta, según el contrato.",
                    "Primero estime su exposición; no use el precio original del carro como sustituto del posible pago del seguro.",
                    "La exposición puede cambiar a medida que el préstamo se amortiza y el vehículo pierde valor.",
                    "GAP es opcional en la mayoría de las situaciones de financiamiento, pero los términos específicos importan.",
                    "Compare el precio y la cobertura con otras fuentes antes de comprar.",
                    "Si financia GAP, recuerde que el producto puede generar intereses además de su precio.",
                    "La calculadora muestra una comparación matemática; el contrato de GAP determina qué pérdidas y saldos son realmente cubiertos.",
                ]}
            />

            <Sources
                locale="es"
                sources={[
                    {
                        title: "Cómo financiar un carro o adquirirlo en la modalidad de leasing",
                        publisher: "Comisión Federal de Comercio",
                        href: "https://consumidor.ftc.gov/articulos/como-financiar-un-carro-o-adquirirlo-en-la-modalidad-de-leasing",
                    },
                    {
                        title: "Cómo comprar un carro usado a un concesionario",
                        publisher: "Comisión Federal de Comercio",
                        href: "https://consumidor.ftc.gov/articulos/como-comprar-un-carro-usado-un-concesionario",
                    },
                    {
                        title: "Auto Insurance Information for Consumers (en inglés)",
                        publisher: "New York Department of Financial Services",
                        href: "https://www.dfs.ny.gov/consumers/auto_insurance/Auto_resource_center",
                    },
                    {
                        title: "What is Guaranteed Asset Protection (GAP) insurance? (en inglés)",
                        publisher: "CFPB",
                        href: "https://www.consumerfinance.gov/ask-cfpb/what-is-guaranteed-asset-protection-gap-insurance-en-797/",
                    },
                    {
                        title: "Am I required to purchase ... GAP insurance? (en inglés)",
                        publisher: "CFPB",
                        href: "https://www.consumerfinance.gov/ask-cfpb/am-i-required-to-purchase-an-extended-warranty-or-guaranteed-asset-protection-gap-insurance-from-a-lender-or-dealer-to-get-an-auto-loan-en-807/",
                    },
                ]}
            />

            <RelatedDecisions
                locale="es"
                currentSlug="vale-la-pena-comprar-gap-para-mi-carro"
            />
        </GuideLayout>
    );
}
