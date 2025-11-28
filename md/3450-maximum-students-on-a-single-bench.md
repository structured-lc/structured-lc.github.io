### Leetcode 3450 (Easy): Maximum Students on a Single Bench [Practice](https://leetcode.com/problems/maximum-students-on-a-single-bench)

### Description  
Given a list of student-bench assignments, where each item is a pair \([student\_id, bench\_id]\), find the maximum number of **unique students** that are seated on any single bench.  
If there are no students, return 0.  
In other words: for each bench, count how many unique students are sitting on it, and return the largest count.

### Examples  

**Example 1:**  
Input: `[[1,1],[2,1],[3,1],[4,2],[5,2]]`  
Output: `3`  
*Explanation: Bench 1 has students [1,2,3], bench 2 has [4,5]. Max is 3 on bench 1.*

**Example 2:**  
Input: `[[1,2],[1,2],[2,2],[3,3]]`  
Output: `2`  
*Explanation:  
Bench 2 has students [1,2] (only unique). Bench 3 has [3].  
Max is 2 on bench 2.*

**Example 3:**  
Input: `[]`  
Output: `0`  
*Explanation: No student assignments, so answer is 0.*


### Thought Process (as if you’re the interviewee)  

Start by thinking about what the problem asks:  
- For every bench, we want the number of unique student IDs seated there.
- The brute-force way is to, for every bench, collect all students sitting on it and count the unique ones.  
- To do that efficiently, I’d use a dictionary (bench\_id → set of student\_ids).  
- For each assignment, add the student\_id to the set for that bench.  
- After processing, look for the largest set (i.e., max by size).

This uses a dictionary to group students by bench and set to deduplicate student IDs.  
Time and space are both manageable with this approach due to simple lookups and insertions.

Trade-off:  
- Hash-based grouping is efficient and concise.
- No unnecessary sorting or nested loops (which would be costly).

### Corner cases to consider  
- Empty input list (`[]`)
- Duplicate assignments (e.g. `[1,2],[1,2]`)
- Only one student or one bench
- All students on one bench
- Each student on a different bench
- Large number of benches, but only one student per bench

### Solution

```python
def maxStudentsOnBench(students):
    # If the list is empty, return 0
    if not students:
        return 0
    
    # Map to store bench_id -> set of unique student_ids
    bench_to_students = dict()
    
    for student_id, bench_id in students:
        # If this is the first time we've seen this bench, create a set
        if bench_id not in bench_to_students:
            bench_to_students[bench_id] = set()
        # Add this student to the set for the current bench
        bench_to_students[bench_id].add(student_id)
    
    # The result is the largest group of unique students on any bench
    return max(len(students_set) for students_set in bench_to_students.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of assignments in input.  
  - Each assignment is processed once, and insertions into a set are O(1) on average.
  - Final max calculation iterates benches.
- **Space Complexity:** O(m), where m is the total number of unique (bench, student) pairs.
  - Stores unique students for each bench, worst case one unique student per bench per input row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the list of benches with the maximum number of unique students?
  *Hint: Instead of just max, collect all benches where the count equals the max value.*

- How would your approach change if benches can be removed or added dynamically with new assignments?
  *Hint: Consider updating and removing sets from your map as changes occur.*

- If student IDs or bench IDs are strings (not integers), how would this affect your code?
  *Hint: Python sets and dictionaries work the same for hashable string keys.*

### Summary
This problem is a classic use of **hash maps with sets** for grouping and deduplicating. It fits the **“group-and-aggregate”** pattern common in data processing and coding interviews, and maps well to problems about finding counts of unique elements by category. This technique is broadly applicable to analytics, counting, and grouping scenarios.


### Flashcard
Use dictionary mapping bench_id → set of student_ids; after processing all assignments, return the bench with maximum unique students.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
