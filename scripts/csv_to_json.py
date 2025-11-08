import csv, json, sys
master = sys.argv[1]; hfsaa_path = sys.argv[2]; self_path = sys.argv[3]
hfsaa, selfd = [], []
with open(master, newline='', encoding='utf-8') as f:
    for row in csv.DictReader(f):
        rec = {k: row.get(k, "") for k in ["id","name","category","cuisine","address","city","state","zip","phone","website","certification"]}
        src = (row.get("source") or "").strip()
        rec["sources"] = [src] if src else []
        if "hfsaa" in rec["certification"].lower():
            hfsaa.append(rec)
        else:
            rec["certification"] = rec["certification"] or "self-declared"
            selfd.append(rec)
with open(hfsaa_path, "w", encoding="utf-8") as f: json.dump(hfsaa, f, indent=2, ensure_ascii=False)
with open(self_path, "w", encoding="utf-8") as f: json.dump(selfd, f, indent=2, ensure_ascii=False)
print(f"Wrote {len(hfsaa)} HFSAA and {len(selfd)} self-declared records.")
