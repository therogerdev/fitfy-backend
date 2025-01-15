import { Programs } from "@prisma/client";

export const formatProgramToJSONAPI = (program: Programs) => ({
    type: 'program',
    id: program.id,
    attributes: {
      name: program.name,
      description: program.description,
      slug: program.slug,
      numWeeks: program.numWeeks,
      numClassesPerWeek: program.numClassesPerWeek,
      durationMin: program.durationMin,
      durationMax: program.durationMax,
      isDraft: program.isDraft,
      active: program.active,
      published: program.published,
      hasSchedule: program.hasSchedule,
      totalClasses: program.totalClasses,
      createdAt: program.createdAt,
    },
    relationships: {
      box: {
        data: {
          type: 'box',
          id: program.boxId,
        },
      },
      classes: {
        data: {
          type: 'classes',
          id: program.classesId,
        },
      },
    },
    links: {
      self: `/api/program/${program.slug}`,
    },
  });
