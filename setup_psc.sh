#!/bin/bash
gcloud config set project silent-blend-412918

for i in {0..49}
do
  gcloud compute addresses create default-ip-"$i" \
    --region=us-central1 \
    --subnet=default
done

for i in {0..49}
do
  if [ "$(gcloud compute addresses describe default-ip-"$i" --region=us-central1 --format="value(status)")" != "RESERVED" ]; then
    echo "default-ip-$i is not RESERVED";
    exit 1;
  fi
done

for i in {0..49}
do
  gcloud compute forwarding-rules create default-"$i" \
    --region=us-central1 \
    --network=default \
    --address=default-ip-"$i" \
    --target-service-attachment=projects/p-yj4rjn4zbse1nx6lhexfpfr5/regions/us-central1/serviceAttachments/sa-us-central1-63a5f38a1e2e96267426dc9c-"$i"
done

if [ "$(gcloud compute forwarding-rules list --regions=us-central1 --format="csv[no-heading](name)" --filter="(name:default*)" | wc -l)" -gt 50 ]; then
  echo "Project has too many forwarding rules that match prefix default. Either delete the competing resources or choose another endpoint prefix."
  exit 2;
fi

gcloud compute forwarding-rules list --regions=us-central1 --format="json(IPAddress,name)" --filter="name:(default*)" > atlasEndpoints-default.json
