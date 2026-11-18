# Research protocol: PPE detector across camera viewpoints

## Research objective
Measure how a single-stage personal protective equipment (PPE) detector trained on frontal CCTV footage generalises to unseen camera viewpoints and distance-shifted footage.

## Research questions
1. How much does performance change between the training viewpoint and unseen overhead/side viewpoints?
2. Which PPE classes are most affected by viewpoint and subject scale?
3. Does distance shift affect small-object recall more strongly than precision?
4. Which failure modes explain the measured performance gap?

## Experimental design
- **Baseline training domain:** frontal CCTV.
- **Held-out evaluation domains:** overhead, side-angle and far-distance footage.
- **Primary comparison:** evaluate the same frozen checkpoint across all test domains.
- **Secondary analysis:** class-wise metrics, object-size buckets, occlusion and lighting conditions.
- **Do not tune on the held-out test set.** Any fine-tuned model must be reported as a separate experiment.

## Dataset requirements
Record for each source: dataset name, source URL, licence/permission, capture date if known, camera ID, viewpoint, approximate subject distance, scene/site identifier, annotation format and split. Keep related frames from the same video/camera/site within one split to reduce leakage.

## Metrics
Report precision, recall, mAP@0.50, mAP@0.50:0.95, per-class AP, confusion matrix and inference latency. Include sample counts and confidence intervals where feasible. State image size, confidence threshold, IoU threshold, hardware and software versions.

## PPE label schema
Define the target classes before annotation. A reasonable starting point is helmet, safety vest, person and (if reliably annotated) no-helmet/no-vest compliance states. Do not mix object detection labels and derived compliance labels without documenting the rule.

## Validity safeguards
- Deduplicate near-identical frames before splitting.
- Split by source video/camera/site, not randomly by adjacent frame.
- Audit label consistency across viewpoints.
- Keep a manifest and checksums for every dataset version.
- Store raw data outside Git; commit only schemas, scripts and small synthetic fixtures.
- Never present dashboard placeholders or example values as experimental findings.

## Minimum report
Dataset composition → split strategy → model/configuration → training details → overall metrics → per-viewpoint metrics → class-wise breakdown → failure analysis → limitations and reproducibility instructions.
