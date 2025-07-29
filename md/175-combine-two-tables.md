### Leetcode 175 (Easy): Combine Two Tables [Practice](https://leetcode.com/problems/combine-two-tables)

### Description  
You are given two tables in a relational database: `Person` and `Address`.  
- `Person` table stores information about people:  
  - PersonId (Primary Key), FirstName, LastName  
- `Address` table may contain addresses for these persons:  
  - AddressId (Primary Key), PersonId (Foreign Key), City, State  
Your task is to write a SQL query that outputs, for every person, their first and last name, and their city and state **if they have an associated address**. If no address exists for a person, show the names with City/State as `NULL`.  
**Return all people in the `Person` table, whether they have an address or not.**

### Examples  

**Example 1:**  
Input:  
`Person = [ [1, "John", "Doe"], [2, "Jane", "Smith"] ]`  
`Address = [ [1, 2, "New York", "NY"] ]`  
Output:  
`[ ["John", "Doe", null, null], ["Jane", "Smith", "New York", "NY"] ]`  
*Explanation: John has no address, so City/State are null. Jane has an address: New York, NY.*

**Example 2:**  
Input:  
`Person = [ [1, "Alice", "Wong"] ]`  
`Address = [ ]`  
Output:  
`[ ["Alice", "Wong", null, null] ]`  
*Explanation: Alice exists in Person, but has no Address. City and State should be null.*

**Example 3:**  
Input:  
`Person = [ [1, "Bob", "Lee"], [2, "Mila", "Carson"] ]`  
`Address = [ [1, 1, "Palo Alto", "CA"], [2, 2, "Chicago", "IL"] ]`  
Output:  
`[ ["Bob", "Lee", "Palo Alto", "CA"], ["Mila", "Carson", "Chicago", "IL"] ]`  
*Explanation: Everyone has an address, so nothing will be null.*

### Thought Process (as if you’re the interviewee)  
- My first idea is to combine both tables so I see everyone's name and, if they exist, their city and state.  
- The important part is that **all people appear in the results**, even if they have no address.
- In SQL, when I want all rows from one table and potentially-matching rows from another, I use a **LEFT JOIN**.
- LEFT JOIN gives me all rows from `Person`, plus any matching address information; if there is no match, City and State will be `NULL`.
- I need to join `Person.PersonId = Address.PersonId`.
- The final columns must be: FirstName, LastName, City, State.

### Corner cases to consider  
- Person table is empty.
- Address table is empty.
- Multiple people, none have an address.
- Multiple people, some have addresses, some don’t.
- Person with more than one address (for this problem, assume at most one).
- Name fields or city/state fields contain NULLs.

### Solution

```python
# In actual interview, we're asked for SQL, not Python.
# But if in Python, using dictionaries to join manually, for illustration:

def combine_two_tables(person, address):
    # Build a map from personId to address info
    address_map = {}
    for addr in address:
        address_map[addr[1]] = (addr[2], addr[3])  # {personId: (city, state)}

    result = []
    for p in person:
        city, state = address_map.get(p[0], (None, None))
        result.append([p[1], p[2], city, state])
    return result
```

**SQL Solution (as would be required):**
```sql
SELECT
  p.FirstName,
  p.LastName,
  a.City,
  a.State
FROM
  Person p
LEFT JOIN
  Address a
ON
  p.PersonId = a.PersonId;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - SQL: O(n), where n = number of rows in Person (assuming Address is indexed). Each Person row is checked for a matching address.
  - Python: O(n + m), where n = len(person), m = len(address), since we preprocess the address table for fast lookup.
- **Space Complexity:**  
  - SQL: O(1) extra space in query processing (database manages rows internally).
  - Python: O(m) for the address_map.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you change if one person could have multiple addresses?
  *Hint: Consider GROUP BY or returning multiple rows per person.*

- How would you filter to only people who have an address?
  *Hint: Change LEFT JOIN to INNER JOIN.*

- How can you show only people without an address?
  *Hint: Use WHERE a.PersonId IS NULL after the LEFT JOIN.*

### Summary
This problem uses the **Left Join** pattern, a canonical and fundamental SQL technique for merging data where one table has all rows and the other may have data or not. It’s commonly used in SQL reporting, data analytics, and database design whenever you want all entities—from a “primary” table—with optional details from another. The same pattern can be applied to user/activity/reporting-type queries across many SQL interviews.