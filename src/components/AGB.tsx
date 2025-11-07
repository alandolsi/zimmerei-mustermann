import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'

interface AGBProps {
  onBack: () => void
}

export function AGB({ onBack }: AGBProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8"
        >
          <ArrowLeft className="mr-2" />
          Zurück zur Startseite
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
            <p className="leading-relaxed">
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Zimmerei Mustermann, 
              Beispielstraße 123, 12345 Musterstadt (nachfolgend „Auftragnehmer") und dem Kunden (nachfolgend 
              „Auftraggeber") über Zimmerarbeiten, Holzbauarbeiten und verwandte Dienstleistungen.
            </p>
            <p className="leading-relaxed mt-4">
              Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Auftraggebers werden 
              nicht Vertragsbestandteil, es sei denn, ihrer Geltung wird ausdrücklich schriftlich zugestimmt.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Vertragsschluss</h2>
            <p className="leading-relaxed">
              Angebote des Auftragnehmers sind freibleibend und unverbindlich, soweit sie nicht ausdrücklich als 
              verbindlich gekennzeichnet sind. Der Vertrag kommt erst durch schriftliche Auftragsbestätigung des 
              Auftragnehmers oder durch Beginn der Ausführung der Arbeiten zustande.
            </p>
            <p className="leading-relaxed mt-4">
              Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung durch den Auftragnehmer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Preise und Zahlungsbedingungen</h2>
            <p className="leading-relaxed">
              Alle Preise verstehen sich in Euro zuzüglich der gesetzlichen Mehrwertsteuer. Die Preise gelten ab Werk 
              bzw. Geschäftssitz des Auftragnehmers. Kosten für Anfahrt, Transport, Verpackung und eventuell anfallende 
              Zölle werden gesondert berechnet, sofern nicht anders vereinbart.
            </p>
            <p className="leading-relaxed mt-4">
              Sofern nicht anders vereinbart, gelten folgende Zahlungsbedingungen:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
              <li>30% Anzahlung bei Auftragserteilung</li>
              <li>40% nach Fertigstellung des Rohbaus bzw. Zwischenetappe</li>
              <li>30% nach vollständiger Fertigstellung und Abnahme der Arbeiten</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Zahlungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug fällig. Bei Zahlungsverzug werden 
              Verzugszinsen in Höhe von 9 Prozentpunkten über dem Basiszinssatz berechnet.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Leistungsumfang</h2>
            <p className="leading-relaxed">
              Der Leistungsumfang ergibt sich aus der Auftragsbestätigung bzw. dem Angebot. Zusätzliche Leistungen, 
              die über den vereinbarten Umfang hinausgehen, werden gesondert vergütet.
            </p>
            <p className="leading-relaxed mt-4">
              Der Auftragnehmer behält sich das Recht vor, Teile der Leistung durch qualifizierte Subunternehmer 
              ausführen zu lassen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Ausführungsfristen und Liefertermine</h2>
            <p className="leading-relaxed">
              Ausführungsfristen und Liefertermine sind nur dann verbindlich, wenn sie vom Auftragnehmer ausdrücklich 
              schriftlich als verbindlich bestätigt wurden.
            </p>
            <p className="leading-relaxed mt-4">
              Die Einhaltung von Fristen setzt voraus, dass der Auftraggeber seinen Mitwirkungspflichten rechtzeitig 
              und vollständig nachkommt. Kommt der Auftraggeber in Annahmeverzug oder verletzt er schuldhaft sonstige 
              Mitwirkungspflichten, so ist der Auftragnehmer berechtigt, den hierdurch entstandenen Schaden ersetzt zu 
              verlangen.
            </p>
            <p className="leading-relaxed mt-4">
              Bei höherer Gewalt, Streik, Aussperrung oder sonstigen unvorhersehbaren Ereignissen, die außerhalb des 
              Einflussbereichs des Auftragnehmers liegen, verlängern sich die Ausführungsfristen angemessen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Mitwirkungspflichten des Auftraggebers</h2>
            <p className="leading-relaxed">
              Der Auftraggeber hat dafür Sorge zu tragen, dass:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
              <li>die Baustelle rechtzeitig zugänglich und arbeitsfähig ist</li>
              <li>erforderliche behördliche Genehmigungen vorliegen</li>
              <li>Strom- und Wasseranschlüsse zur Verfügung stehen</li>
              <li>ausreichende Lagermöglichkeiten für Material vorhanden sind</li>
              <li>die erforderlichen Informationen und Unterlagen rechtzeitig bereitgestellt werden</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Verzögerungen, die durch nicht erfüllte Mitwirkungspflichten entstehen, gehen zu Lasten des Auftraggebers 
              und können zu Mehrkosten führen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Abnahme</h2>
            <p className="leading-relaxed">
              Der Auftraggeber ist verpflichtet, die erbrachten Leistungen nach Fertigstellung abzunehmen. Die Abnahme 
              gilt als erfolgt, wenn der Auftraggeber nicht innerhalb von 14 Tagen nach Mitteilung der Fertigstellung 
              schriftlich Mängel rügt oder die Abnahme ohne Angabe von Gründen verweigert.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Gewährleistung</h2>
            <p className="leading-relaxed">
              Für die erbrachten Leistungen gelten die gesetzlichen Gewährleistungsbestimmungen nach BGB und VOB/B, 
              soweit vereinbart. Die Gewährleistungsfrist beträgt für Bauleistungen 4 Jahre ab Abnahme, für andere 
              Leistungen 2 Jahre.
            </p>
            <p className="leading-relaxed mt-4">
              Der Auftraggeber hat Mängel unverzüglich nach Feststellung schriftlich zu rügen. Bei berechtigter 
              Mängelrüge wird der Auftragnehmer nach seiner Wahl nachbessern oder Ersatz liefern.
            </p>
            <p className="leading-relaxed mt-4">
              Die Gewährleistung erstreckt sich nicht auf:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 leading-relaxed">
              <li>natürliche Abnutzung und Verschleiß</li>
              <li>Schäden durch unsachgemäße Behandlung oder Wartung</li>
              <li>Schäden durch nachträgliche Änderungen oder Reparaturen durch Dritte</li>
              <li>Schäden durch höhere Gewalt</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Haftung</h2>
            <p className="leading-relaxed">
              Der Auftragnehmer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der 
              Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung des Auftragnehmers oder eines 
              gesetzlichen Vertreters oder Erfüllungsgehilfen des Auftragnehmers beruhen.
            </p>
            <p className="leading-relaxed mt-4">
              Für sonstige Schäden haftet der Auftragnehmer nur bei Vorsatz und grober Fahrlässigkeit. Die Haftung für 
              leichte Fahrlässigkeit ist ausgeschlossen, soweit nicht wesentliche Vertragspflichten verletzt werden.
            </p>
            <p className="leading-relaxed mt-4">
              Der Auftragnehmer unterhält eine Betriebshaftpflichtversicherung mit marktüblichen Deckungssummen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Material und Baugrund</h2>
            <p className="leading-relaxed">
              Soweit nicht anders vereinbart, erfolgt die Beschaffung des Materials durch den Auftragnehmer. Der 
              Auftragnehmer ist berechtigt, gleichwertiges Material einzusetzen, wenn das vereinbarte Material nicht 
              oder nicht rechtzeitig verfügbar ist.
            </p>
            <p className="leading-relaxed mt-4">
              Der Auftraggeber haftet für die Beschaffenheit des Baugrunds und für die Richtigkeit der von ihm 
              gemachten Angaben über Bodenverhältnisse und bestehende Leitungen.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Eigentumsvorbehalt</h2>
            <p className="leading-relaxed">
              Die gelieferten Materialien und eingebauten Teile bleiben bis zur vollständigen Bezahlung aller 
              Forderungen aus der Geschäftsbeziehung Eigentum des Auftragnehmers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Aufrechnung und Zurückbehaltungsrecht</h2>
            <p className="leading-relaxed">
              Der Auftraggeber kann nur mit unbestrittenen oder rechtskräftig festgestellten Forderungen aufrechnen. 
              Ein Zurückbehaltungsrecht kann der Auftraggeber nur ausüben, soweit sein Gegenanspruch auf demselben 
              Vertragsverhältnis beruht.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Datenschutz</h2>
            <p className="leading-relaxed">
              Der Auftragnehmer verpflichtet sich, alle im Rahmen der Geschäftsbeziehung bekannt gewordenen Daten 
              vertraulich zu behandeln und nur im Rahmen der Vertragsabwicklung zu verwenden. Weitere Informationen 
              zum Datenschutz finden Sie in unserer Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Schlussbestimmungen</h2>
            <p className="leading-relaxed">
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
            </p>
            <p className="leading-relaxed mt-4">
              Erfüllungsort und Gerichtsstand ist der Geschäftssitz des Auftragnehmers, sofern der Auftraggeber 
              Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.
            </p>
            <p className="leading-relaxed mt-4">
              Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen 
              Bestimmungen hiervon unberührt. Die unwirksame Bestimmung ist durch eine wirksame zu ersetzen, die dem 
              wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
            </p>
          </section>

          <section className="mt-12 pt-8 border-t border-border">
            <p className="leading-relaxed text-muted-foreground">
              Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
