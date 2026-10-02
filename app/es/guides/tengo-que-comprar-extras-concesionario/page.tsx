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
import DealerAddOnCostCalculator from "./DealerAddOnCostCalculator";
import RelatedDecisions from "@/app/components/article/RelatedDecisions";

const siteUrl = "https://www.northwardmeridian.com";
const canonicalUrl =
    `${siteUrl}/es/guides/tengo-que-comprar-extras-concesionario`;

const guideSections = [
    { id: "dealer-add-on-cost-calculator", label: "Calculadora" },
    { id: "short-answer", label: "La respuesta corta" },
    { id: "what-are-add-ons", label: "Qué son los extras" },
    { id: "optional", label: "Cuándo son opcionales" },
    { id: "financing-cost", label: "El costo de financiarlos" },
    { id: "common-add-ons", label: "Extras comunes" },
    { id: "compare", label: "Cómo comparar un extra" },
    { id: "monthly-payment", label: "No mire solo el pago mensual" },
    { id: "before-signing", label: "Qué revisar antes de firmar" },
    { id: "questions", label: "Preguntas para el concesionario" },
    { id: "takeaways", label: "Puntos clave" },
] as const;

const guidedEntryScenarios = [
    {
        id: "required",
        title: "El concesionario dice que necesito un producto para obtener el financiamiento.",
        summary:
            "Revise si el producto es realmente obligatorio antes de aceptarlo.",
        guidance:
            "Empiece por la sección sobre productos opcionales. Pida que le indiquen por escrito dónde el contrato exige ese producto y confirme los términos directamente con el prestamista cuando corresponda.",
        destinationId: "optional",
        destinationLabel: "Cuándo son opcionales",
    },
    {
        id: "cost",
        title: "Me ofrecen varios extras y quiero saber cuánto me costarán.",
        summary:
            "Calcule el efecto de incorporarlos al préstamo.",
        guidance:
            "Sume el precio de los extras y use el APR y plazo que le ofrecen. La calculadora separa su costo del resto del vehículo.",
        destinationId: "dealer-add-on-cost-calculator",
        destinationLabel: "Calculadora",
    },
    {
        id: "value",
        title: "No sé si una garantía, GAP u otro producto me conviene.",
        summary:
            "Separe primero el costo del producto de la decisión sobre su cobertura.",
        guidance:
            "Compare qué cubre, qué excluye, cuánto cuesta, si ya tiene cobertura similar y si puede comprar una alternativa en otro lugar.",
        destinationId: "compare",
        destinationLabel: "Cómo comparar un extra",
    },
] as const;

export const metadata: Metadata = {
    title:
        "¿Tengo que comprar los extras que me ofrece el concesionario? | Northward Meridian",
    description:
        "Entienda cuáles productos adicionales del concesionario suelen ser opcionales y calcule cuánto pueden costar si los incorpora al préstamo del carro.",
    alternates: {
        canonical: canonicalUrl,
    },
    openGraph: {
        type: "article",
        url: canonicalUrl,
        siteName: "Northward Meridian",
        title:
            "¿Tengo que comprar los extras que me ofrece el concesionario?",
        description:
            "Guía en español sobre extras del concesionario, productos opcionales y el costo de financiarlos con un préstamo de auto.",
        locale: "es_US",
        publishedTime: "2026-10-01",
        modifiedTime: "2026-10-01",
    },
    twitter: {
        card: "summary",
        title:
            "¿Tengo que comprar los extras que me ofrece el concesionario?",
        description:
            "Vea cuáles extras suelen ser opcionales y cuánto pueden costar si los financia con el carro.",
    },
};

const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
        "¿Tengo que comprar los extras que me ofrece el concesionario?",
    description:
        "Guía en español sobre productos adicionales del concesionario y el costo de incorporarlos a un préstamo de auto.",
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

export default function SpanishDealerAddOnsGuide() {
    return (
        <GuideLayout
            locale="es"
            category="Automóviles"
            title="¿Tengo que comprar los extras que me ofrece el concesionario?"
            description="Entienda cuáles productos adicionales suelen ser opcionales, qué revisar antes de aceptarlos y cuánto pueden costar si los incorpora al préstamo del carro."
            updated="Octubre 2026"
            readingTime="12 min"
            recommendedFor="Personas que están comprando o financiando un carro y reciben ofertas de GAP, contratos de servicio, garantías extendidas, protección de llantas u otros productos adicionales."
            bottomLine="Muchos extras que se ofrecen al comprar o financiar un carro son opcionales. Antes de aceptar uno, confirme si realmente es obligatorio, pida su precio por separado, revise qué cubre y qué excluye, compare alternativas y calcule cuánto pagará si lo incorpora al préstamo."
            sections={guideSections}
            structuredData={articleJsonLd}
            guidedEntry={
                <GuidedEntry
                    locale="es"
                    scenarios={guidedEntryScenarios}
                />
            }
        >
            <DealerAddOnCostCalculator />

            <WhyThisMatters locale="es" id="short-answer">
                <p>
                    Los concesionarios pueden ofrecer productos y servicios
                    adicionales al precio del vehículo. Entre ellos pueden estar
                    GAP, contratos de servicio, garantías extendidas, protección
                    de llantas o ruedas, tratamientos, accesorios y otros
                    complementos.
                </p>
                <p>
                    <strong>
                        Muchos de estos productos son opcionales.
                    </strong>{" "}
                    Si decide comprarlos y los incorpora al préstamo, aumenta el
                    monto financiado y normalmente también aumenta el pago mensual
                    y el interés total. Evalúe cada producto por separado antes de
                    aceptar un paquete completo.
                </p>
            </WhyThisMatters>

            <GuideSection
                locale="es"
                id="what-are-add-ons"
                eyebrow="Concepto"
                title="Los extras son productos o servicios adicionales al vehículo."
            >
                <p>
                    La FTC usa términos como <strong>extras</strong> y
                    <strong> complementos</strong> para productos o servicios que
                    se ofrecen además del carro. Pueden aparecer durante la
                    negociación o en la oficina de financiamiento y seguros del
                    concesionario.
                </p>
                <InformationCard title="Separe el carro de los extras">
                    <p>
                        Pida el precio del vehículo y el precio de cada producto
                        adicional por separado. Así puede decidir si quiere el
                        carro sin aceptar automáticamente todos los productos que
                        le ofrecen junto con él.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="optional"
                eyebrow="Obligatorio u opcional"
                title="No asuma que un producto es obligatorio porque se lo presentan junto con el financiamiento."
            >
                <p>
                    La FTC indica que, por lo general, puede comprar el vehículo
                    sin los extras que ofrece el concesionario. El CFPB también
                    describe productos como GAP, garantías extendidas y seguros de
                    crédito como productos adicionales que normalmente son
                    opcionales.
                </p>
                <p>
                    Si alguien le dice que debe comprar un producto para obtener
                    el préstamo, pida que le muestren dónde aparece ese requisito
                    en el contrato y confirme qué exige realmente el prestamista.
                </p>
                <InformationCard title="Hay una diferencia entre seguro obligatorio y un producto adicional">
                    <p>
                        Un prestamista puede exigir ciertos seguros sobre el
                        vehículo financiado. Eso no significa que todos los
                        productos de protección que ofrece el concesionario sean
                        obligatorios. Revise cada requisito y cada producto por
                        separado.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="financing-cost"
                eyebrow="Financiamiento"
                title="Un extra financiado cuesta más que su precio inicial cuando paga intereses."
            >
                <p>
                    Si incorpora un producto adicional al préstamo, ese precio se
                    suma al monto financiado. El costo mensual puede parecer
                    pequeño, pero el producto también puede generar intereses
                    durante varios años.
                </p>
                <InformationCard title="Ejemplo">
                    <p>
                        Si incorpora $3,500 en extras a un préstamo de 72 meses al
                        8% APR, la calculadora estima aproximadamente $61 por mes y
                        cerca de $4,400 pagados en total por esos extras. Cambie
                        los números por los de su oferta real antes de decidir.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="common-add-ons"
                eyebrow="Productos comunes"
                title="No todos los extras hacen lo mismo."
            >
                <p>
                    Un producto puede tener valor para una persona y poco valor
                    para otra. La decisión depende de su precio, cobertura,
                    exclusiones, alternativas y situación financiera.
                </p>
                <InformationCard title="GAP">
                    <p>
                        Está diseñado para cubrir parte o toda la diferencia entre
                        lo que debe por el préstamo y lo que paga el seguro si el
                        vehículo es robado o declarado pérdida total, según los
                        términos del producto.
                    </p>
                </InformationCard>
                <InformationCard title="Garantía extendida o contrato de servicio">
                    <p>
                        Puede cubrir ciertas reparaciones después o además de la
                        garantía del fabricante. Revise qué componentes están
                        cubiertos, qué se excluye, cuánto dura y si duplica una
                        cobertura que ya tiene.
                    </p>
                </InformationCard>
                <InformationCard title="Protecciones y accesorios">
                    <p>
                        Protección de llantas y ruedas, tratamientos de pintura o
                        tela, grabado de VIN, sistemas de seguridad y accesorios
                        físicos pueden venderse como productos adicionales. Pida el
                        precio individual y compare alternativas.
                    </p>
                </InformationCard>
            </GuideSection>

            <GuideSection
                locale="es"
                id="compare"
                eyebrow="Comparación"
                title="Evalúe cada extra como una compra independiente."
            >
                <p>
                    No necesita decidir si todos los extras son buenos o malos.
                    Pregunte qué problema resuelve cada producto y compare ese
                    beneficio con su costo real.
                </p>
                <InformationCard title="Cinco preguntas básicas">
                    <p>
                        ¿Cuánto cuesta? ¿Qué cubre? ¿Qué no cubre? ¿Ya tengo una
                        cobertura similar? ¿Puedo comprar una alternativa más
                        adelante o en otro lugar?
                    </p>
                </InformationCard>
                <p>
                    Para contratos de servicio o garantías extendidas, compare la
                    cobertura con la garantía del fabricante y revise las
                    condiciones, deducibles, límites, procedimientos de reclamo y
                    reglas de cancelación. Para GAP, compare el precio y los
                    términos con otras fuentes disponibles para usted.
                </p>
            </GuideSection>

            <GuideSection
                locale="es"
                id="monthly-payment"
                eyebrow="Pago mensual"
                title="Un aumento pequeño en el pago mensual puede ocultar un costo total considerable."
            >
                <p>
                    Una oferta puede presentar un producto como una cantidad
                    adicional por mes. Ese número no muestra por sí solo el precio
                    del producto ni cuánto pagará durante todo el plazo.
                </p>
                <p>
                    Pida el precio de cada extra por separado y compare el monto
                    financiado y el pago mensual con y sin esos productos. La
                    calculadora de esta guía le permite aislar esa parte del
                    préstamo.
                </p>
            </GuideSection>

            <DecisionChecklist
                locale="es"
                id="before-signing"
                title="Antes de firmar"
                items={[
                    "Pida una lista con el precio de cada extra o complemento.",
                    "Confirme cuáles productos son opcionales y cuáles, si alguno, son realmente exigidos por el prestamista.",
                    "Revise qué cubre y qué excluye cada producto.",
                    "Compruebe si ya tiene una garantía, seguro o cobertura similar.",
                    "Compare precios y alternativas fuera del concesionario cuando sea posible.",
                    "Revise si el producto puede cancelarse y qué reglas de reembolso se aplican.",
                    "Compare el monto financiado y el pago mensual con y sin los extras.",
                    "Lea el contrato final y confirme que no contiene productos que no aceptó.",
                ]}
            />

            <QuestionsToAsk
                locale="es"
                id="questions"
                title="Preguntas para el concesionario o prestamista"
                subtitle="Pida respuestas claras antes de aceptar un producto adicional."
                questions={[
                    "¿Este producto es opcional?",
                    "¿Cuál es su precio por separado?",
                    "¿Qué cubre exactamente y qué excluye?",
                    "¿Cuánto aumenta el monto que voy a financiar?",
                    "¿Cuál sería mi pago mensual sin este producto?",
                    "¿Puedo comprar una cobertura similar en otro lugar?",
                    "¿Duplica alguna garantía o seguro que ya tengo?",
                    "¿Puedo cancelarlo después y cómo funciona cualquier reembolso?",
                    "¿Dónde aparece este producto y su precio en el contrato?",
                ]}
            />

            <KeyTakeaways
                locale="es"
                id="takeaways"
                items={[
                    "Muchos extras del concesionario son productos opcionales y deben evaluarse por separado del vehículo.",
                    "Pida el precio individual de cada producto y no se limite a cuánto agrega al pago mensual.",
                    "Financiar un extra aumenta el monto del préstamo y puede hacer que pague intereses sobre ese producto.",
                    "Revise cobertura, exclusiones, duración, alternativas y reglas de cancelación antes de aceptar.",
                    "Confirme que el contrato final solo incluya los productos que usted decidió comprar.",
                    "Que un producto sea opcional no significa que nunca tenga valor; significa que debe decidir si su beneficio justifica su costo para su situación.",
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
                        title: "Your Money, Your Goals: Herramientas financieras en español",
                        publisher: "CFPB",
                        href: "https://files.consumerfinance.gov/f/documents/bcfp_your-money-goals_a-financial-empowerment-toolkit_es.pdf",
                    },
                    {
                        title: "Am I required to purchase an extended warranty, GAP insurance, or credit insurance? (en inglés)",
                        publisher: "CFPB",
                        href: "https://www.consumerfinance.gov/ask-cfpb/am-i-required-to-purchase-an-extended-warranty-or-guaranteed-asset-protection-gap-insurance-from-a-lender-or-dealer-to-get-an-auto-loan-en-807/",
                    },
                    {
                        title: "What things can I negotiate when shopping for a car or auto loan? (en inglés)",
                        publisher: "CFPB",
                        href: "https://www.consumerfinance.gov/ask-cfpb/what-things-can-i-negotiate-when-shopping-for-a-car-or-auto-loan-en-2132/",
                    },
                ]}
            />
            <RelatedDecisions
                locale="es"
                currentSlug="tengo-que-comprar-extras-concesionario"
            />
        </GuideLayout>
    );
}
