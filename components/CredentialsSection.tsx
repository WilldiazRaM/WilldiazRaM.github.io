import Image from "next/image";
import { GraduationCap, Award, ExternalLink, ShieldCheck, Cpu } from "lucide-react";
import { Reveal } from "./Reveal";

const certificates = [
  { title: "DevSecOps in Azure", file: "devsecops_in_azure.pdf" },
  { title: "Backend Engineer", file: "2_backend_engineer.pdf" },
  { title: "Fundamentos de Ciberseguridad", file: "3_fundamentals_cibersecurity.pdf" },
  { title: "Análisis de Datos con SQL", file: "5_analize_data_sql.pdf" },
  { title: "Go Fundamentals", file: "1_go_fundamentals.pdf" }
];

export function CredentialsSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Respaldo Técnico y Académico</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Ingeniería sólida respaldada por instituciones de primer nivel y formación continua en arquitecturas cloud, seguridad e Inteligencia Artificial.
            </p>
          </div>
        </Reveal>

        {/* Pilares de Autoridad - Ahora en 3 columnas */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
              <div className="bg-blue-100 p-4 rounded-full text-blue-700">
                <GraduationCap size={32} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Ingeniero en Informática</h3>
                <p className="text-slate-500 text-sm">Titulado • Duoc UC</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
               <div className="w-16 h-16 relative flex-shrink-0">
                  <Image 
                    src="/Microsoft_founder_member.jpg" 
                    alt="Microsoft Founders Hub" 
                    fill 
                    className="object-contain rounded-lg"
                  />
               </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Microsoft Founders Hub</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1">
                  <ShieldCheck size={14} className="text-green-600"/> Miembro Activo
                </p>
              </div>
            </div>
          </Reveal>

          {/* Nuevo Pilar: Inteligencia Artificial */}
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
              <div className="bg-purple-100 p-4 rounded-full text-purple-700">
                <Cpu size={32} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Integración de IA</h3>
                <p className="text-slate-500 text-sm">Desarrollo acelerado y automatización inteligente</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Grilla de Certificados PDF */}
        <Reveal delay={0.4}>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-6 pb-4 border-b border-gray-100">
              <Award className="text-blue-600" size={24} /> 
              Certificaciones Especializadas
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert, index) => (
                <a 
                  key={index}
                  href={`/certificates/${cert.file}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                >
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors line-clamp-2 pr-2">
                    {cert.title}
                  </span>
                  <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}