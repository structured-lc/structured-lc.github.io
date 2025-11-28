### Leetcode 3586 (Medium): Find COVID Recovery Patients [Practice](https://leetcode.com/problems/find-covid-recovery-patients)

### Description  
Given a table of patient test records, you are to find patients who have recovered from COVID.  
A patient is considered **recovered** if they first had at least one 'positive' COVID test and later had at least one 'negative' test. You must output the patient IDs of all such patients.

**Assume the table schema is:**
- patient_id (int)
- test_date (date)
- test_result (enum: 'positive', 'negative')

### Examples  

**Example 1:**  
Input=`[{patient_id: 1, test_date: '2023-06-01', test_result: 'positive'}, {patient_id: 1, test_date: '2023-07-01', test_result: 'negative'}]`  
Output=`[1]`  
*Explanation: Patient 1 had a positive test and then a negative test, so is recovered.*

**Example 2:**  
Input=`[{patient_id: 2, test_date: '2023-06-10', test_result: 'positive'}]`  
Output=`[]`  
*Explanation: Patient 2 only has positive tests, so is not considered recovered.*

**Example 3:**  
Input=`[{patient_id: 3, test_date: '2023-05-01', test_result: 'negative'}]`  
Output=`[]`  
*Explanation: Patient 3 only has a negative test, so never actually had COVID according to records.*

**Example 4:**  
Input=`[
    {patient_id: 4, test_date: '2023-04-01', test_result: 'positive'},
    {patient_id: 4, test_date: '2023-05-01', test_result: 'positive'},
    {patient_id: 4, test_date: '2023-07-01', test_result: 'negative'},
    {patient_id: 5, test_date: '2023-03-11', test_result: 'negative'},
    {patient_id: 5, test_date: '2023-04-11', test_result: 'negative'}
]`  
Output=`[4]`  
*Explanation: Patient 4 had positive test(s) followed by at least one negative; patient 5 was never positive.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each patient, check all their test results and whether there is at least one 'positive' test, and later (by date) at least one 'negative' test.  
- To optimize, for each patient, find the earliest positive test date and look for any negative test with test_date after that.  
- Final approach:  
    - Group data by patient.  
    - For each patient, find the earliest positive test_date.  
    - For each patient, check if there exists a negative test_date later than the earliest positive date.  
    - If so, add patient_id to output.  
- Tradeoff: If test records are large, either sort or use efficient grouping or database queries.

### Corner cases to consider  
- Patient has only negative tests: not recovered.  
- Patient has positive but **no** negative after: not recovered.  
- Patient has negative then positive then negative: must count only if negative comes after any positive.  
- No records: output is empty.  
- Multiple patients, some may tie on test_dates: compare by patient_id and date.
- Patient has multiple positives, but no negative: not recovered.
- Patient has positive and negative on the same date (rare, but consider): check that negative date is ≥ positive date.

### Solution

```python
def find_covid_recovery_patients(records):
    # Group records by patient_id
    from collections import defaultdict
    
    patient_tests = defaultdict(list)
    for rec in records:
        # For each test, append (date, result)
        patient_tests[rec['patient_id']].append(
            (rec['test_date'], rec['test_result'])
        )
    
    recovered = []
    for pid, tests in patient_tests.items():
        # Sort tests by date
        tests.sort()
        # Find earliest positive test date
        earliest_positive = None
        for date, res in tests:
            if res == 'positive':
                earliest_positive = date
                break
        if not earliest_positive:
            continue
        # Look for any negative after earliest positive
        recovered_flag = False
        for date, res in tests:
            if res == 'negative' and date > earliest_positive:
                recovered_flag = True
                break
        if recovered_flag:
            recovered.append(pid)
    return recovered
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N), where N = number of records. Each patient's records are sorted by date. Grouping is O(N), sorting per patient total is O(N log N) in worst case.
- **Space Complexity:** O(N). Extra space used for grouping patient records and the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if test records are huge and do not fit in memory?  
  *Hint: Can you process sequentially, use sorting by patient_id and date, or a database query?*

- How would you write this as a SQL query?  
  *Hint: Consider using GROUP BY and window functions.*

- What if test_dates are not guaranteed to be unique per patient?  
  *Hint: Sort by both date and a unique test identifier, or ensure total ordering.*

### Summary
This problem applies the **Grouping and Minimum/Maximum aggregation** pattern often used for log analysis and event stream analysis per entity.  
The solution uses grouping, sorting, and scanning for ordered events (positive → later negative), a pattern valuable for user history, fraud detection, and state-machine problems.


### Flashcard
Group by patient, find earliest positive test date, check if any negative test exists after that date.

### Tags
Database(#database)

### Similar Problems
