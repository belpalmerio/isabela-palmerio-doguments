import "./Record.scss";
import formatDate from "../../utils/formatDate";
import { baseUrl, port } from "../../utils/api";

function Record({ records }) {
  return (
    <section className="doc">
      {records.length > 0 ? (
        <ul>
          {records.map((record) => (
            <li className="doc__item" key={record.id}>
              <p className="doc__body">Appointment Date:</p>
              {formatDate(record.appt_date)}
              <img
                src={`http://localhost:${port}/document_uploads/${record.record_file}`}
                alt={record.record_file}
                className="doc__img"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No records found.</p>
      )}
    </section>
  );
}

export default Record;
