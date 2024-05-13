export class Department {
  id: number | null = null;
  name: string = '';
  club: { id: number } | null = null;

  constructor(id: number | null, name: string, clubId: number | null) {
    this.id = id;
    this.name = name;
    this.club = clubId ? { id: clubId } : null;
  }
}
