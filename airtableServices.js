const Airtable = require('airtable');

const AIRTABLE_API_KEY = 'patcyBGvD7Jtupg5F.d8ae3f2d38698a1b4505f44c327323428a0ce286235f1ff492fb200075da2c2b';
const AIRTABLE_BASE_ID = 'appn6IFRc9fpV07zJ';
const LAVORATORI_TABLE_ID = 'tbllC20toBqiVSCZU';

// Init Airtable
const base = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);

// Cerca il lavoratore in Airtable in base alla mail passata, in caso di trovarlo torna i fields, e in caso di NON trovarlo torna null
async function getLavoratore(email) {
    console.log("Cercando lavoratore con la mail: ", email)
    try {
        const records = await base(LAVORATORI_TABLE_ID)
            .select({
                filterByFormula: `{email} = '${email}'`,
                maxRecords: 1
            })
            .firstPage();

        if (records.length > 0) {
            return records[0].fields;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Errore cercando in Airtable:', error);
        throw new Error('Errore cercando in database.');
    }
}

module.exports = {
    getLavoratore,
};
