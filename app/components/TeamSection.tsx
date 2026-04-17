import { TeamMember } from '@/types/salon';

interface TeamSectionProps {
  team: TeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-5">
        <h2 className="section-title text-center">Meet Our Stylists</h2>
        <p className="section-subtitle text-center">Talented professionals ready to transform your look</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-gray-50 p-6 rounded-2xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="w-36 h-36 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent"></div>
              <h3 className="font-serif text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary font-semibold mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {member.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs bg-accent text-secondary px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
