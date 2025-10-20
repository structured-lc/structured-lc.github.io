### Leetcode 2512 (Medium): Reward Top K Students [Practice](https://leetcode.com/problems/reward-top-k-students)

### Description  
You are given lists of positive and negative feedback words, as well as a collection of student feedback reports (one per student) and their corresponding IDs.  
Each report may contain words from either of the feedback lists.  
- Every occurrence of a *positive* feedback word in a report adds 3 points to that student's score.
- Every occurrence of a *negative* feedback word subtracts 1 point from their score.

After scoring, students are ranked by their final point totals (highest first).  
If students have the same score, the one with the lower ID ranks higher.  
Return the IDs of the top k students, ranked according to the above rules.

### Examples  

**Example 1:**  
Input:  
positive_feedback = `["smart","brilliant","studious"]`,  
negative_feedback = `["not"]`,  
report = `["this student is not studious","the student is smart","the student is brilliant"]`,  
student_id = `[1,2,3]`,  
k = `2`  
Output: `[2,3]`  
Explanation:  
- Student 1 ("this student is not studious"): "not" (−1), "studious" (+3) → score = 2  
- Student 2 ("the student is smart"): "smart" (+3) → score = 3  
- Student 3 ("the student is brilliant"): "brilliant" (+3) → score = 3  
Top 2 students by score are 2 and 3. Since both have 3, the smaller ID (2) comes first.

**Example 2:**  
Input:  
positive_feedback = `["positive","good"]`,  
negative_feedback = `["bad"]`,  
report = `["positive good bad","bad bad good","positive"]`,  
student_id = `[5,3,7]`,  
k = `1`  
Output: ``  
Explanation:  
- Student 5: "positive" (+3), "good" (+3), "bad" (−1) → score = 5  
- Student 3: "bad" (−1), "bad" (−1), "good" (+3) → score = 1  
- Student 7: "positive" (+3) → score = 3  
Top 1 student is ID 7 (score 3).

**Example 3:**  
Input:  
positive_feedback = `["nice"]`,  
negative_feedback = `["mean"]`,  
report = `["nice mean nice"]`,  
student_id = ``,  
k = `1`  
Output: ``  
Explanation:  
- Student 9: "nice" (+3 × 2 = 6), "mean" (−1) → score = 5

### Thought Process (as if you’re the interviewee)  

1. **Brute-force Idea:**  
    - For each report, split by space, check each word:  
        - If it's a positive word, add 3 to the student's score; if negative, subtract 1.  
        - Otherwise ignore.
    - At the end, store a (score, student_id) pair for all students.
    - Sort all students:  
        - Highest score first.  
        - If scores equal, lower student_id first.  
    - Return the first k student IDs.

2. **Optimization:**  
    - Use sets for positive/negative word lookups (for O(1) checking).
    - Process words in each report just once.
    - After scoring, sort using Python's sort with a custom key `(-score, student_id)`.

3. **Trade-Offs:**  
    - Sorting is O(n log n), where n = # of students — acceptable for typical constraints.
    - Using sets ensures fast lookups for each word (vs. list lookup).

### Corner cases to consider  
- No report has any feedback word (everyone gets 0).
- Tied scores among > k students — test if the tie-breaking by ID works as required.
- Multiple identical words in one report.
- Large values of k (k = n).
- Reports with punctuation (if not guaranteed to be space-separated words; but as per the problem, they're words, so it's safe).
- Empty feedback lists (positive or negative).

### Solution

```python
def topStudents(positive_feedback, negative_feedback, report, student_id, k):
    # Convert feedback lists to sets for O(1) checking
    pos_set = set(positive_feedback)
    neg_set = set(negative_feedback)
    
    # Store (score, student_id) pairs
    scores = []
    
    for i in range(len(report)):
        words = report[i].split()
        score = 0
        for word in words:
            if word in pos_set:
                score += 3
            elif word in neg_set:
                score -= 1
        scores.append((score, student_id[i]))
    
    # Sort: primary key = -score (descending), secondary = student_id (ascending)
    scores.sort(key=lambda x: (-x[0], x[1]))
    
    # Extract the first k student IDs
    return [scores[i][1] for i in range(k)]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - O(m \* l + n log n), where  
        - m = number of reports / students,  
        - l = average number of words in a report,  
        - n = number of students.  
    - Scanning each report is O(l), there are m reports,  
    - Sorting the m students is O(n log n).

- **Space Complexity:**  
    - O(p + q + n), where  
        - p = number of positive words,  
        - q = number of negative words,  
        - n = number of students (to store their (score, id) tuples).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if each feedback report could belong to multiple students, or if one student could have multiple reports?  
  *Hint: Map IDs to scores, aggregate over all reports per student, possibly preprocess.*

- If words are not guaranteed to be lowercase, or may contain punctuation, how would you adapt?  
  *Hint: Normalize case, strip punctuation before processing.*

- If the score mapping changes (e.g., positive = +1, negative = -2, or custom scores per word), can your code accommodate this easily?  
  *Hint: Use a dictionary to map scores per word; change score lookup logic.*

### Summary
This problem is a classic case of **scoring + sorting with tie-breakers**.  
The solution uses hashing for efficient look-up (Python set), iterates through each record, and uses a custom sort based on two keys.  
Such scoring-and-ranking logic is a common pattern — applicable to problems like "rank athletes", "sort employees by performance", or "select top N items with multiple ranking criteria".


### Flashcard
Convert positive/negative word lists to sets, score each report by checking words against sets (+3/-1), sort by (score desc, id asc), return top k IDs.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Queue Reconstruction by Height(queue-reconstruction-by-height) (Medium)
- K Highest Ranked Items Within a Price Range(k-highest-ranked-items-within-a-price-range) (Medium)