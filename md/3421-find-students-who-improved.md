### Leetcode 3421 (Medium): Find Students Who Improved [Practice](https://leetcode.com/problems/find-students-who-improved)

### Description  
Given a table of exam scores for multiple students, each row consists of a student's ID, a subject, their score, and the exam date. You need to list all (student_id, subject) pairs where:
- The student has at least two exam records for the same subject (on different dates).
- The score on the latest exam date is higher than the first exam date (i.e., the student improved in that subject).  
Return the result ordered by student_id and subject (both ascending).

### Examples  

**Example 1:**  
Input:  
Scores =  
| student_id | subject | score | exam_date  |
|------------|---------|-------|------------|
| 101        | Math    | 70    | 2023-01-15 |
| 101        | Math    | 85    | 2023-02-15 |
| 102        | Math    | 80    | 2023-01-17 |
| 102        | Math    | 78    | 2023-02-20 |

Output:  
| student_id | subject | first_score | latest_score |
|------------|---------|-------------|--------------|
| 101        | Math    | 70          | 85           |

*Explanation:*
- 101's Math: First=70, Latest=85 → improved.
- 102's Math: First=80, Latest=78 → not improved.

**Example 2:**  
Input:  
Scores =  
| student_id | subject | score | exam_date  |
|------------|---------|-------|------------|
| 103        | Science | 88    | 2023-01-10 |
| 103        | Science | 90    | 2023-04-15 |
| 103        | Science | 92    | 2023-06-20 |
| 104        | Science | 80    | 2023-01-10 |

Output:  
| student_id | subject | first_score | latest_score |
|------------|---------|-------------|--------------|
| 103        | Science | 88          | 92           |

*Explanation:*
- 103 has multiple Science scores. First=88 (Jan), Latest=92 (June) → improved.
- 104: only one record, ignored.

**Example 3:**  
Input:  
Scores =  
| student_id | subject | score | exam_date  |
|------------|---------|-------|------------|
| 201        | History | 95    | 2023-03-01 |
| 201        | History | 95    | 2023-06-01 |

Output:  
(no rows)

*Explanation:*
- 201's scores stay the same: no improvement.

### Thought Process (as if you’re the interviewee)  
- First, for every (student_id, subject) pair, we need all the scores sorted by exam_date to identify the first and latest scores.
- The brute-force method:
  - For each pair, select all rows, sort by date, and compare the first and last score.
  - If more than one record exists and the latest score > first score, record the (student_id, subject).
- To optimize:
  - Use a dictionary to store for each (student_id, subject) key: min(exam_date) and max(exam_date) with their corresponding scores.
  - Iterate once to build, then check if latest_score > first_score for each key where count ≥ 2.
- Tradeoffs:
  - This two-pass approach is efficient in Python: one pass to gather info, one pass to filter.
  - It avoids unnecessary sorting of all lists, only tracks min/max needed.

### Corner cases to consider  
- Students with only one exam for a subject (should be ignored).
- First and latest exam on the same day (should compare only if there are two records, even if date is the same).
- Same scores (no improvement).
- Negative or zero scores (likely not present given constraints, but should handle).
- Multiple students, multiple subjects.

### Solution

```python
def find_students_who_improved(scores):
    # scores: list of dict {'student_id', 'subject', 'score', 'exam_date'}
    from collections import defaultdict

    # For each (student, subject), keep track of:
    # [first_score, first_date], [latest_score, latest_date], count
    info = defaultdict(lambda: {"first_score": None, "first_date": None,
                                "latest_score": None, "latest_date": None, "count": 0})

    for rec in scores:
        key = (rec['student_id'], rec['subject'])
        date = rec['exam_date']
        score = rec['score']

        if info[key]["first_date"] is None or date < info[key]["first_date"]:
            info[key]["first_date"] = date
            info[key]["first_score"] = score
        # For latest, use >= to ensure if there are multiple on same day,
        # the last encountered will be used.
        if info[key]["latest_date"] is None or date >= info[key]["latest_date"]:
            info[key]["latest_date"] = date
            info[key]["latest_score"] = score

        info[key]["count"] += 1

    # Prepare output in sorted order
    result = []
    for (student_id, subject), data in info.items():
        if data["count"] >= 2 and data["latest_score"] > data["first_score"]:
            result.append({
                "student_id": student_id,
                "subject": subject,
                "first_score": data["first_score"],
                "latest_score": data["latest_score"]
            })

    result.sort(key=lambda x: (x["student_id"], x["subject"]))
    return result

# Example usage:
scores = [
    {"student_id": 101, "subject": "Math", "score": 70, "exam_date": "2023-01-15"},
    {"student_id": 101, "subject": "Math", "score": 85, "exam_date": "2023-02-15"},
    {"student_id": 102, "subject": "Math", "score": 80, "exam_date": "2023-01-17"},
    {"student_id": 102, "subject": "Math", "score": 78, "exam_date": "2023-02-20"},
]
print(find_students_who_improved(scores))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rows in input.  
  Each row is examined once, and then a linear iteration over all unique (student, subject) keys (≤ n).
- **Space Complexity:** O(k), where k = unique (student_id, subject) pairs.  
  Additional storage for mapping statistics and the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the score data could be updated after initial exam?
  *Hint: Think about if you would always need to reprocess all records or could you update just the changed key efficiently.*

- Can you compute the total amount of improvement for each student in each subject (latest_score - first_score)?
  *Hint: Simply add an extra field for improvement.*

- How would you return all the exams where the score decreased, not just improved?
  *Hint: Change the comparison condition from latest_score > first_score to latest_score < first_score.*

### Summary
This problem is an example of the "group by key, compute aggregate per group" pattern, commonly found in data processing, analytics, and interview questions (e.g., SQL window functions, reduce-by-key in Spark/map-reduce). It applies wherever you need to track and compare first/last or min/max events in time for grouped entities. The coding pattern is a standard single-pass hash map approach with per-group aggregation.


### Flashcard
Group scores by (student_id, subject) and sort by exam_date; for each group with ≥2 records, check if latest score > first score.

### Tags
Database(#database)

### Similar Problems
