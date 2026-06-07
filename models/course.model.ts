import { Temporal } from "@js-temporal/polyfill";

export interface Course {
  readonly id: string;
  title: string;
  capacity: number;
  startDate?: Temporal.PlainDate;// course may not have start date
}

export type CourseStatus =
| { status: "DRAFT"; createdBy: string; createdAt: Temporal.Instant }
| { status: "PUBLISHED"; publishedAt: Temporal.Instant; syllabus: string }
| { status: "ACTIVE"; enrolledCount: number; startDate: Temporal.PlainDate;}
| { status: "ARCHIVED"; archivedAt: Temporal.Instant; finalEnrollmentCount: number;}
| { status: "CANCELLED"; reason: string; cancelledAt: Temporal.Instant };


export function describeCourse(status: CourseStatus): string {
  switch (status.status) {
    case "DRAFT":
      return `Draft course created by ${status.createdBy} at ${status.createdAt}`;

    case "PUBLISHED":
      return `Published on ${status.publishedAt} with syllabus: ${status.syllabus}`;

    case "ACTIVE":
      return `Active course started on ${status.startDate} with ${status.enrolledCount} enrolled students`;

    case "ARCHIVED":
      return `Archived on ${status.archivedAt} with final enrollment count of ${status.finalEnrollmentCount}`;

    case "CANCELLED":
      return `Cancelled: ${status.reason}`;

    default: {
      const _check: never = status;
      throw new Error(`Unhandled status: ${JSON.stringify(_check)}`);
    }
  }
}


  