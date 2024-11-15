const functions = require('@google-cloud/functions-framework');

const { getLavoratore } = require('./airtableServices');


functions.http('getUltimoForm', async (req, res) => {

    console.log('Dati ricevuti nel body:', req.body);


    const email = req.body.email;

    if (!email) {
        return res.status(400).send("Error: La mail non può essere vuota.");
    }

    try {
        // Cerchiamo lavoratore in Airtable
        const lavoratore = await getLavoratore(email);

        if (lavoratore) {
            console.log('Lavoratore trovato:', lavoratore);
            return res.json({
                'email': lavoratore.email,
                'nome': lavoratore.nome,
                'tipo_lavoro': lavoratore.tipo_lavoro_domestico,
                'ultimo_form_completato': lavoratore.ultimo_form_completato
            });
        } else {
            return res.status(404).send(`Not found: Lavoratore non torvato con email: ${email} .`);
        }
    } catch (error) {
        console.error('Errore in getUltimoForm():', error);
        return res.status(500).send('Errore del server.');
    }
});