### Leetcode 1280 (Easy): Students and Examinations [Practice](https://leetcode.com/problems/students-and-examinations)

### Description  
Given a list of students, a list of subjects, and a list of exam records (who attended which subject), return for every (student, subject) pair, how many times that student attempted that subject. Include pairs where the attempt count is 0, sorted first by student name then by subject name.

### Examples  
**Example 1:**  
Input: `students = ["Alice", "Bob"], subjects = ["Math", "Physics"], exams = [["Alice", "Math"], ["Alice", "Math"], ["Bob", "Physics"]]`
Output: `[["Alice", "Math", 2], ["Alice", "Physics", 0], ["Bob", "Math", 0], ["Bob", "Physics", 1]]`
*Explanation: Alice attempted Math twice, Bob attempted Physics once. The other pairs were not attempted.*

**Example 2:**  
Input: `students = ["Mary"], subjects = ["English"], exams = []`
Output: `[["Mary", "English", 0]]`
*Explanation: No attempts were made, so the count is 0.*

**Example 3:**  
Input: `students = ["Zoe", "Ana"], subjects = ["Bio"], exams = [["Ana", "Bio"]]`
Output: `[["Ana", "Bio", 1], ["Zoe", "Bio", 0]]`
*Explanation: Only Ana attended Bio, Zoe did not.*


### Thought Process (as if you’re the interviewee)  
First, initialize a count of attempts for each (student, subject) pair to 0. Next, process the exams records and increment the appropriate pair each time. At the end, collect the data in sorted order by student and subject. Brute force would iterate over all possibilities, but a hash map for pair-count is efficient.

Optimized plan:
- Precompute all pairs with 0.
- Use a dictionary to count attempts for efficiency.
- Output data in sorted order.


### Corner cases to consider  
- Students or subjects are empty.
- Exams list is empty.
- Duplicate exam entries (same student and subject multiple times).
- Students or subjects not referenced in exams.


### Solution

```python
from collections import defaultdict

def students_and_examinations(students, subjects, exams):
    # Sort students and subjects as required for output order
    students = sorted(students)
    subjects = sorted(subjects)
    # Count how many times each (student, subject) appeared
    count = defaultdict(int)
    for student, subject in exams:
        count[(student, subject)] += 1
    result = []
    for student in students:
        for subject in subjects:
            result.append([student, subject, count[(student, subject)]])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + s×t), where m is exam records, s = number of students, t = number of subjects (for generating all pairs).
- **Space Complexity:** O(s×t) for the output and counter storage.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a larger input if (students × subjects) is very large?
  *Hint: Only output nonzero attempts, or optimize storage using sparse representation.*
- How can you speed up if students and subjects are already sorted?
  *Hint: Skip sort step, linear scan sufficient.*
- How would you extend to allow query by date or exam instance?
  *Hint: count by (student, subject, date) tuple instead.*

### Summary
The approach uses hash maps and pair iteration, a common pattern for problems asking about all combinations with counts. Efficient when all pairs are needed, and easily adapted to more complex queries or joins.

### Tags
Database(#database)

### Similar Problems
