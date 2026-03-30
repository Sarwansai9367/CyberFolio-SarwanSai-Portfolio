import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { skillsData } from "@/lib/data"
import { Sparkles, Award, Zap, Target, Code2, Shield } from "lucide-react"

export function EnhancedSkillsRedesign() {
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

  const categoryIcons = {
    Cybersecurity: Shield,
    Development: Code2,
    "Tools & Technologies": Zap,
  }

  const categoryColors = {
    Cybersecurity: {
      gradient: "from-red-500 via-pink-500 to-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      icon: "bg-red-100 text-red-600",
    },
    Development: {
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      icon: "bg-blue-100 text-blue-600",
    },
    "Tools & Technologies": {
      gradient: "from-purple-500 via-indigo-500 to-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      icon: "bg-purple-100 text-purple-600",
    },
  }

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200 px-6 py-2 text-lg">
            <Sparkles className="w-5 h-5 mr-2" />
            Technical Expertise
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-6">
            Skills & Competencies
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Building expertise in cybersecurity, ethical hacking, and cutting-edge technologies through hands-on
            projects, continuous learning, and practical application in real-world scenarios.
          </p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => {
            const colors = categoryColors[category as keyof typeof categoryColors]
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons]

            return (
              <div key={category} className="relative">
                {/* Category Header */}
                <div className="flex items-center justify-center mb-12">
                  <div
                    className={`flex items-center gap-4 px-8 py-4 rounded-2xl ${colors.bg} ${colors.border} border-2 shadow-lg`}
                  >
                    <div className={`p-3 rounded-xl ${colors.icon} shadow-md`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${colors.text}`}>{category}</h3>
                      <p className="text-slate-600">{skills.length} specialized skills</p>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill, index) => (
                    <Card
                      key={skill.id}
                      className="group relative overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                      }}
                    >
                      {/* Animated Background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Skill Level Indicator */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`w-12 h-12 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center shadow-md`}
                        >
                          <span className={`text-sm font-bold ${colors.text}`}>{skill.level}%</span>
                        </div>
                      </div>

                      <CardHeader className="relative z-10 pb-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl ${colors.icon} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                          >
                            <skill.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                              {skill.name}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative z-10 space-y-6">
                        <p className="text-slate-600 leading-relaxed">{skill.description}</p>

                        {/* Enhanced Progress Bar */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                              Proficiency Level
                            </span>
                          </div>

                          <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000 ease-out shadow-inner`}
                              style={{ width: `${skill.level}%` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          </div>
                        </div>

                        {/* Skill Level Badge */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <Badge
                            className={`${
                              skill.level >= 85
                                ? "bg-green-100 text-green-700 border-green-200"
                                : skill.level >= 75
                                  ? "bg-blue-100 text-blue-700 border-blue-200"
                                  : "bg-orange-100 text-orange-700 border-orange-200"
                            } px-3 py-1 font-semibold`}
                          >
                            {skill.level >= 85 ? "🏆 Advanced" : skill.level >= 75 ? "⚡ Intermediate" : "📚 Learning"}
                          </Badge>

                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < Math.floor(skill.level / 20)
                                    ? `bg-gradient-to-r ${colors.gradient}`
                                    : "bg-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Certifications Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-3xl p-12 border border-blue-100 shadow-xl">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Professional Certifications
              </h3>
            </div>

            <p className="text-slate-600 mb-8 text-lg">
              Validated expertise through industry-recognized certifications
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                {
                  name: "CEH (Certified Ethical Hacker)",
                  org: "EC-Council",
                  icon: "🛡️",
                  color: "from-red-500 to-pink-500",
                },
                {
                  name: "Salesforce AI Associate",
                  org: "Salesforce",
                  icon: "🤖",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  name: "Microsoft Career Essentials",
                  org: "Microsoft",
                  icon: "💼",
                  color: "from-green-500 to-teal-500",
                },
              ].map((cert, i) => (
                <Card
                  key={i}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-w-[280px]"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{cert.icon}</div>
                    <h4 className="font-bold text-slate-900 mb-2">{cert.name}</h4>
                    <Badge className={`bg-gradient-to-r ${cert.color} text-white border-0 px-3 py-1`}>{cert.org}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Target,
              title: "Specialized Focus",
              description: "Deep expertise in cybersecurity, ethical hacking, and secure system design",
              color: "from-red-500 to-pink-500",
            },
            {
              icon: Zap,
              title: "Rapid Learning",
              description: "Quick adaptation to new technologies and security methodologies",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Shield,
              title: "Security First",
              description: "Always prioritizing security and best practices in every solution",
              color: "from-purple-500 to-indigo-500",
            },
          ].map((item, i) => (
            <Card
              key={i}
              className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
