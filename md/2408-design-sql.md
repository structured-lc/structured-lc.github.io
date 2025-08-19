### Leetcode 2408 (Medium): Design SQL [Practice](https://leetcode.com/problems/design-sql)

### Description  
You are asked to implement a very simplified SQL database system that can:
- **Store multiple tables** (each with a given name and column count; tables store only _strings_ per cell).
- **Insert new rows** to any table. Each row will be assigned a unique, auto-incremented 1-based _row ID_ (first row: 1, second: 2, ...).
- **Delete specific rows** by table name and row ID. Deletions do not "reuse" or reset IDs.
- **Select a specific cell** by table name, row ID (1-based), and column ID (1-based), returning the string in that cell.

All operations must be supported efficiently, and IDs are _never re-used_ even after deletes. For each table, row IDs serve as logical keys (even if the row at that ID is missing due to deletion).

### Examples  

**Example 1:**  
Input:   
`sql = SQL(["Users"], [2])`  
`sql.insertRow("Users", ["Alice", "Smith"])`  
`sql.insertRow("Users", ["Bob", "Jones"])`  
`sql.selectCell("Users", 2, 1)`  
Output:  
`"Bob"`  
*Explanation: 2nd row inserted is ["Bob", "Jones"]. Selecting column 1 gives "Bob".*

**Example 2:**  
Input:   
`sql = SQL(["Products"], [3])`  
`sql.insertRow("Products", ["Pen", "1.00", "Blue"])`  
`sql.insertRow("Products", ["Pencil", "0.50", "Yellow"])`  
`sql.deleteRow("Products", 1)`  
`sql.selectCell("Products", 2, 3)`  
Output:  
`"Yellow"`  
*Explanation: After deleting 1st row, selecting 2nd row, 3rd column from ["Pencil", "0.50", "Yellow"] returns "Yellow".*

**Example 3:**  
Input:   
`sql = SQL(["People"], [1])`  
`sql.insertRow("People", ["Jane"])`  
`sql.deleteRow("People", 1)`  
`sql.insertRow("People", ["Joe"])`  
`sql.selectCell("People", 2, 1)`  
Output:  
`"Joe"`  
*Explanation: After delete, ids continue to increment. "Joe" becomes rowId 2. Selecting (2,1) gives "Joe".*


### Thought Process (as if you’re the interviewee)  
- The core challenge is mapping **table name** → rows, and assigning/incrementing **row IDs** per table, while being able to delete by ID and select by ID/col.
- **Brute force idea:** Use a `dict` for each table, mapping rowId → row list. When inserting, keep a "max id" tracker and increment it. For deletion, remove the entry for that id.
- **Why not just a list?**  
  If we used a list and simply removed an item, rowIds would shift, which is not allowed. We need constant-time ID lookup and deletion, with fixed IDs.
- **Optimized approach:**  
  - For each table, store:  
    - Next available row ID (auto-increment counter)  
    - Dict mapping rowId → row values (list of strings)
  - Insertion: increment counter, assign to row, update table's row storage.
  - Deletion: remove the rowId entry if it exists.
  - Selection: lookup in table's map, error/return if not found.

**Trade-offs:**  
- Simple and clean.  
- Dicts give O(1) insert, delete, and access by ID.  
- Because each table is independent, maintenance is straightforward.

### Corner cases to consider  
- Inserting a row with incorrect column count.
- Deleting a non-existent row ID (should silently ignore).
- Selecting a deleted/missing row or invalid column ID (problem guarantees assume valid calls).
- Re-using row IDs (should not happen).
- Multiple tables with different sizes.

### Solution

```python
class SQL:
    def __init__(self, names: list[str], columns: list[int]):
        # For each table, store: { "col_count": int, "next_id": int, "rows": {rowId: rowList} }
        self.tables = {}
        for i in range(len(names)):
            self.tables[names[i]] = {
                "col_count": columns[i],
                "next_id": 1,
                "rows": {}
            }

    def insertRow(self, name: str, row: list[str]) -> None:
        # Check column count
        table = self.tables[name]
        if len(row) != table["col_count"]:
            raise ValueError("Inserted row size does not match column count")
        rid = table["next_id"]
        table["rows"][rid] = row
        table["next_id"] += 1

    def deleteRow(self, name: str, rowId: int) -> None:
        table = self.tables[name]
        # Remove only if it exists
        if rowId in table["rows"]:
            del table["rows"][rowId]

    def selectCell(self, name: str, rowId: int, columnId: int) -> str:
        table = self.tables[name]
        # rowId and columnId are 1-based
        row = table["rows"][rowId]
        return row[columnId - 1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - Constructor: O(n), where n = number of tables.
  - insertRow: O(1) per insert.
  - deleteRow: O(1) per delete.
  - selectCell: O(1) per access.
- **Space Complexity:**
  - O(total inserted rows × avg column count), as each row is stored individually.
  - Extra O(t) for per-table bookkeeping, where t = number of tables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to support updating a cell value?
  *Hint: Consider add an `updateCell` method which directly modifies the row's value.*

- What if selectCell is called for a rowId that has been deleted?
  *Hint: You could throw an exception or return a special error value.*

- How would you implement support for multiple data types, e.g., integers or floats?
  *Hint: Add type constraints, and parsing/validation for each column.*

### Summary
This problem demonstrates **practical use of hash maps for ID-based row access** and auto-increment logic, a key design pattern for simulating in-memory table-like data stores. These ideas are core for problems requiring implements of databases, ID mapping, or fast indexed lookup. The dictionary-of-dictionaries pattern (with counters) can be generally applied in programming whenever you need fast key-mapped records with deletion and controlled incremented IDs.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Design(#design)

### Similar Problems
