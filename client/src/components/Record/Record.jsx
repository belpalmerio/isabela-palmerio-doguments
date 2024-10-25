import "./Record.scss";
import formatDate from "../../utils/formatDate";
import { baseUrl, port } from "../../utils/api";

function Record({ records }) {
  return (
    <>
      <div className="records">Veterinary Records</div>
      {records.length > 0 ? (
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {formatDate(record.appt_date)}
              <img
                src={`http://localhost:${port}/document_uploads/${record.record_file}`}
                alt={record.record_file}
                className="my-pets__img"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No records found.</p>
      )}
    </>
  );
}

export default Record;
