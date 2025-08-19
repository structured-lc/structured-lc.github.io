### Leetcode 578 (Medium): Get Highest Answer Rate Question [Practice](https://leetcode.com/problems/get-highest-answer-rate-question)

### Description  
Given a log of survey events, where each log entry records a **question_id** and an **action** ("show" or "answer"), find the question with the **highest answer rate**.  
- **Answer rate** is defined as: number of answers for a question ÷ number of times the question was shown.
- Only count *answers* if the question was *shown* at least once.
- If multiple questions tie for the highest answer rate, return the one with the **smallest question_id**.

This problem asks you to process a list of (question_id, action) pairs, compute the answer rate for each question that was shown, and find the question_id with the greatest (answers ÷ shows) ratio.  
  
### Examples  

**Example 1:**  
Input: `[(1, "show"), (1, "answer"), (2, "show"), (3, "show"), (3, "answer")]`  
Output: `1`  
*Explanation*:  
- Q1: 1 show, 1 answer → 1.0  
- Q2: 1 show, 0 answers → 0.0  
- Q3: 1 show, 1 answer → 1.0  
Q1 and Q3 both have a 1.0 answer rate, so we return 1 (smallest ID).

**Example 2:**  
Input: `[(2, "show"), (2, "answer"), (1, "show"), (1, "show")]`  
Output: `2`  
*Explanation*:  
- Q2: 1 show, 1 answer → 1.0  
- Q1: 2 shows, 0 answers → 0.0  
Q2 has the highest answer rate.

**Example 3:**  
Input: `[(5, "show"), (5, "answer"), (5, "show"), (5, "answer"), (5, "show")]`  
Output: `5`  
*Explanation*:  
- Q5: 3 shows, 2 answers → 2÷3 ≈ 0.666...  
Q5 is the only question, so it is returned.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  At first, I’d want to count, for each question, how many times it was “shown” and how many times it was “answered”.  
  After having both counts, I can compute answer rate = answers ÷ shows for all questions that were ever shown.

- **Optimizing:**  
  I can use two dictionaries: 
  - One maps question_id → show_count
  - The other maps question_id → answer_count

  After a first pass through the input, I calculate the answer rate for each question with show_count ≥ 1. As I do this, I track the max answer rate and its associated question_id (using the smallest ID if there’s a tie).

- **Why this approach:**  
  This is efficient: one pass to build counts, another pass to pick the max. It’s O(n) time and O(k) space (k = number of unique questions), which is optimal for this task.

### Corner cases to consider  
- No “show” action at all: there should be no valid question; edge case to handle.
- Questions that are answered without being shown (should not happen; if present, answers#/shows# is 0/0 and thus ignored).
- Multiple questions with the same max answer rate: return the smallest question_id.
- Input is empty: No valid question, may need to return None or an appropriate value.
- Show count is 0 for some question but answer count > 0 (shouldn’t happen, but robust code should handle it).

### Solution

```python
def get_highest_answer_rate_question(survey_log):
    # Dictionaries to store show and answer counts.
    show_counts = {}
    answer_counts = {}

    for question_id, action in survey_log:
        if action == "show":
            show_counts[question_id] = show_counts.get(question_id, 0) + 1
        elif action == "answer":
            answer_counts[question_id] = answer_counts.get(question_id, 0) + 1

    max_rate = -1
    result_qid = None

    for qid in show_counts:
        shows = show_counts[qid]
        answers = answer_counts.get(qid, 0)
        answer_rate = answers / shows

        if answer_rate > max_rate:
            max_rate = answer_rate
            result_qid = qid
        elif answer_rate == max_rate and qid < result_qid:
            result_qid = qid

    return result_qid
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of survey_log (every entry processed once; dictionary access is O(1)).
- **Space Complexity:** O(k), where k is the number of unique question_ids, due to dictionaries for show and answer counts.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the top N questions with the highest answer rates instead of just one?  
  *Hint: Use a max heap or sort the questions by answer rate and pick top N.*

- What if we want to track answer rates over different time intervals (e.g., last week)?  
  *Hint: Add timestamp filtering or bucketing in your logic.*

- How would you handle millions of records if memory is a concern?  
  *Hint: Consider streaming processing or distributed counting, like using map-reduce.*

### Summary
This problem uses a common **hash map counting** technique and a simple max-tracking pattern, suitable wherever frequency ratios are needed by unique key. The solution is efficient, scales well, and the code pattern is useful in survey analytics, user event logs, and A/B testing scenarios.

### Tags
Database(#database)

### Similar Problems
