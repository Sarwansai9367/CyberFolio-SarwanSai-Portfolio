import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { skillsData } from "@/lib/data"
import { Sparkles, Award } from "lucide-react"

export function EnhancedSkills() {
  const skillsByCategory = skillsData.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skillsData>,
  )

  const categoryColors = {
    Cybersecurity: "from-red-500 to-pink-500",
    Development: "from-blue-500 to-cyan-500",
    "Tools & Technologies": "from-purple-500 to-indigo-500",
  }

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-2" />
            Technical Skills
          </Badge>
          <h2 className="text-headline text-slate-900 mb-4">Growing Expertise in Cybersecurity</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Building a strong foundation in cybersecurity through hands-on projects, continuous learning, and practical
            application.
          </p>
        </div>

        {/* Skills by Category */}
        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`w-1 h-8 bg-gradient-to-b ${categoryColors[category as keyof typeof categoryColors]} rounded-full`}
                />
                <h3 className="text-2xl font-bold text-slate-900">{category}</h3>
                <Badge variant="outline" className="ml-auto text-slate-600">
                  {skills.length} skills
                </Badge>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <Card
                    key={skill.id}
                    className="group card-hover bg-white border-0 shadow-lg relative overflow-hidden"
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${categoryColors[skill.category as keyof typeof categoryColors]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                    />

                    <CardHeader className="relative z-10 pb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 bg-gradient-to-br ${categoryColors[skill.category as keyof typeof categoryColors]} rounded-lg shadow-md`}
                        >
                          <skill.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-slate-900">{skill.name}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4">
                      <p className="text-slate-600 text-sm leading-relaxed">{skill.description}</p>

                      {/* Skill Level */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            Proficiency
                          </span>
                          <span className="text-sm font-bold text-blue-600">{skill.level}%</span>
                        </div>

                        <div className="relative">
                          <Progress value={skill.level} className="h-2 bg-slate-200" />
                          <div
                            className={`absolute top-0 left-0 h-2 bg-gradient-to-r ${categoryColors[skill.category as keyof typeof categoryColors]} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>

                      {/* Skill Level Badge */}
                      <div className="pt-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            skill.level >= 85
                              ? "bg-green-50 text-green-700 border-green-200"
                              : skill.level >= 75
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-orange-50 text-orange-700 border-orange-200"
                          }`}
                        >
                          {skill.level >= 85 ? "Advanced" : skill.level >= 75 ? "Intermediate" : "Learning"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-slate-900">Certifications</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "CEH (Certified Ethical Hacker) - EC-Council",
              "Salesforce AI Associate",
              "Microsoft Career Essentials in Cybersecurity",
            ].map((cert, i) => (
              <Badge
                key={i}
                variant="outline"
                className="px-4 py-2 text-sm bg-white border-slate-300 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
