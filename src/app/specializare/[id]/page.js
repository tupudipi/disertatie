import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CommentSection from '@/components/CommentSection';
import { AuthenticationProvider } from '@/components/context/AuthContext';
import Link from 'next/link';

// Define an async function to fetch data on the server
async function fetchData(id) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const specializare = await fetch(`${baseUrl}/api/specializari/${id}`).then(res => res.json());

  const facultate = specializare.id_facultate
    ? await fetch(`${baseUrl}/api/facultati/${specializare.id_facultate}`).then(res => res.json())
    : {};

  const universitate = facultate.id_universitate
    ? await fetch(`${baseUrl}/api/universitati/${facultate.id_universitate}`).then(res => res.json())
    : {};

  const ramura = specializare.id_ramura
    ? await fetch(`${baseUrl}/api/ramuri/${specializare.id_ramura}`).then(res => res.json())
    : {};

  const domeniu = ramura.id_domeniu
    ? await fetch(`${baseUrl}/api/domenii/${ramura.id_domeniu}`).then(res => res.json())
    : {};

  const oras = facultate.id_oras
    ? await fetch(`${baseUrl}/api/orase/${facultate.id_oras}`).then(res => res.json())
    : {};

  const regiune = oras.id_regiune
    ? await fetch(`${baseUrl}/api/regiuni/${oras.id_regiune}`).then(res => res.json())
    : {};

  return { specializare, facultate, universitate, ramura, domeniu, oras, regiune };
}

// Server component
export default async function SpecializarePage({ params }) {
  const { specializare, facultate, universitate, ramura, domeniu, oras, regiune } = await fetchData(params.id);

  return (
    <>
      <Container fluid="lg">
        <h1 className='page-header display-3'>
          <small className="text-muted">Specializarea </small>
          {specializare.nume}
        </h1>
        <h4>
          <small className="text-muted">
            <Link className="text-decoration-none w-100" href={`/facultate/${specializare.id_facultate}`}>
              <i className="bi bi-award"></i> {facultate.nume}
            </Link>
          </small><br />
          <small className="text-muted">
            <Link className="text-decoration-none w-100" href={`/universitate/${facultate.id_universitate}`}>
              <i className="bi bi-house"></i> {universitate.nume}
            </Link>
          </small>
        </h4>
        <hr />
        <div className="row">
          <div className="col text-center">
            <h5 className="mt-4 mb-2">
              <Link className="text-decoration-none w-100" href={`/domeniu/${ramura.id_domeniu}`}>
                <i className="bi bi-stop"></i> Domeniul {domeniu.nume}
              </Link>
            </h5>
            <h5 className="mb-4">
              <Link className="text-decoration-none w-100" href={`/ramura/${specializare.id_ramura}`}>
                <i className="bi bi-diagram-3"></i> Ramura {ramura.nume}
              </Link>
            </h5>
          </div>
          <div className="col text-center">
            <h5 className="mt-4 mb-2">
              <Link className="text-decoration-none w-100" href={`/regiune/${oras.id_regiune}`}>
                <i className="bi bi-geo-alt"></i> {regiune.nume}
              </Link>
            </h5>
            <h5 className="mb-4">
              <Link className="text-decoration-none w-100" href={`/oras/${facultate.id_oras}`}>
                <i className="bi bi-building"></i> {oras.nume}
              </Link>
            </h5>
          </div>
        </div>
      </Container>
      <hr></hr>
      <Container fluid="lg">
        <AuthenticationProvider>
          <CommentSection pageId={params.id} />
        </AuthenticationProvider>
      </Container>
    </>
  );
}
