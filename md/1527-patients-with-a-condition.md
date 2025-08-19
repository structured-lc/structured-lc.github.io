### Leetcode 1527 (Easy): Patients With a Condition [Practice](https://leetcode.com/problems/patients-with-a-condition)

### Description  
Given a table `Patients` with columns `patient_id`, `patient_name`, and `conditions`, find all patients who have *Type 1 Diabetes*. The code for Type 1 Diabetes always starts with the prefix `"DIAB1"` (case-insensitive), and the prefix may occur as the first word in the `conditions` column or as a separate word elsewhere (but only if it is a whole word, not as a substring within another word).  
Return the patient ID, name, and condition for qualified patients.  

In simpler terms: For each patient, if their `conditions` column contains `"DIAB1"` as the first word, or occurs elsewhere as a full word separated by spaces, include them in the output.

### Examples  

**Example 1:**  
Input:  
```
Patients table:
+------------+--------------+-----------------------+
| patient_id | patient_name | conditions            |
+------------+--------------+-----------------------+
| 1          | Ethan        | Arteriosclerosis      |
| 2          | Bob          | DIAB100 Myocarditis   |
| 3          | Alice        | DIAB100 DIAB1         |
| 4          | George       | DIAB1                 |
| 5          | David        | Myocarditis           |
+------------+--------------+-----------------------+
```
Output:  
```
+------------+--------------+---------------------+
| patient_id | patient_name | conditions          |
+------------+--------------+---------------------+
| 2          | Bob          | DIAB100 Myocarditis |
| 3          | Alice        | DIAB100 DIAB1       |
| 4          | George       | DIAB1               |
+------------+--------------+---------------------+
```
*Explanation:*
- Bob: `"DIAB100"` starts with `"DIAB1"` (okay).
- Alice: has `"DIAB1"` as a separate word.
- George: `"DIAB1"` is the full condition.
- Ethan and David: have no such condition.


**Example 2:**  
Input:  
```
+------------+--------------+-----------------------+
| patient_id | patient_name | conditions            |
+------------+--------------+-----------------------+
| 1          | Mike         | diab1                 |
| 2          | Carol        | cancer diab1          |
| 3          | Steve        | Myocarditis           |
+------------+--------------+-----------------------+
```
Output:  
```
+------------+--------------+---------------------+
| patient_id | patient_name | conditions          |
+------------+--------------+---------------------+
| 1          | Mike         | diab1               |
| 2          | Carol        | cancer diab1        |
+------------+--------------+---------------------+
```
*Explanation:*
- Mike: `conditions` starts with `"diab1"`.
- Carol: has `"diab1"` as a separate word.
- Steve: does not have `"diab1"` as a word.


**Example 3:**  
Input:  
```
+------------+--------------+-----------------------+
| patient_id | patient_name | conditions            |
+------------+--------------+-----------------------+
| 1          | Paul         | Cardio                |
| 2          | Ann          | Hypothyroidism        |
+------------+--------------+-----------------------+
```
Output:  
```
(empty)
```
*Explanation:*
No patients have `"diab1"` condition.


### Thought Process (as if you’re the interviewee)  
To solve this, I need to find patients whose `conditions` string contains the word `"DIAB1"` or any word starting with `"DIAB1"` as a prefix (case-insensitive).

**Brute-force idea:**  
- For each row, split the `conditions` string by spaces.
- Check if any word starts with `"diab1"` (ignore case).
- If yes, include this patient.

**Optimized (standard approach):**
- Since we often work with SQL or pandas for these problems, the search can be done by:
  - Using string splitting, checking if any word in the list starts with `"diab1"`.
  - In SQL, use `LIKE 'DIAB1%'` for the first word, or `' DIAB1%'` for subsequent words, or use regex for word boundaries.
- This is efficient because we only need to split on spaces, and check prefix matches.

**Trade-offs:**  
- Splitting and scanning through each word is O(n) per patient, but since conditions string is short, this cost is negligible in practice.
- If the field gets huge with many conditions, other string parsing or full-text search may scale better.

### Corner cases to consider  
- Empty `conditions` string.
- Multiple spaces between conditions.
- `"diab1"` in the middle or end (must be a full word or a word starting with `"diab1"`).
- `"diab1"` as a substring inside another word not starting with `"diab1"` (should NOT match).
- Mixed cases: `"DIAB1"`, `"diab1"`, `"DiAb1"`.

### Solution

```python
def patients_with_condition(patients):
    """
    patients: List of dictionaries, each with keys: 'patient_id', 'patient_name', 'conditions'
    Return: List of matched patients with required fields
    """
    result = []
    for patient in patients:
        conditions = patient['conditions']
        # Split the conditions by whitespace
        words = conditions.strip().split()
        # Check if any word starts with "diab1" (case insensitive)
        for word in words:
            if word.lower().startswith("diab1"):
                result.append({
                    "patient_id": patient["patient_id"],
                    "patient_name": patient["patient_name"],
                    "conditions": patient["conditions"]
                })
                break  # No need to check further if match found
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k), where n is the number of patients, k is the average number of words per condition. For each patient, we split and scan the list of words.
- **Space Complexity:** O(r), where r is the number of matching patients stored in result. No extra space beyond per-row string splitting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the condition delimiter was not always a space (could be comma, semicolon, etc.)?  
  *Hint: Consider using regex to split on any non-alphanumeric boundary.*

- How would you design the query if the `conditions` field was very large or had thousands of words?  
  *Hint: Explore scalable text search, full-text search indexes, or inverted indices.*

- Suppose you wanted to return only unique patient IDs who have any type of diabetes (not just `"diab1"` but also `"diab2"`, `"diab3"`, etc.).  
  *Hint: Generalize prefix matching to `"diab"`.*

### Summary
This problem uses the **string scanning** pattern—break a string by delimiters and check for a prefix in each word.  
It's a simple application of data search, and similar logic is common in word parsing, CSV scanning, and substring search problems.  
Mastering this approach is useful in many data cleanup and filtering tasks where you identify key tokens or codes in textual fields.

### Tags
Database(#database)

### Similar Problems
